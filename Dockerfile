# syntax=docker/dockerfile:1.7
# -----------------------------------------------------------------------------
# Dependencies
#
# --ignore-scripts skips the `prepare` hook, which runs husky. Git hooks are
# meaningless in an image and .git is excluded by .dockerignore anyway. None of
# the runtime dependencies need install scripts.
# -----------------------------------------------------------------------------
FROM node:24.18-alpine3.23 AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# -----------------------------------------------------------------------------
# Build
# -----------------------------------------------------------------------------
FROM node:24.18-alpine3.23 AS build

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# next.config.ts sets output: 'standalone'. NEXT_PUBLIC_API_URL is only read at
# runtime inside rewrites(), and the browser client uses the relative '/api'
# base URL, so no public env vars need to be baked in here.
RUN npm run build

# -----------------------------------------------------------------------------
# Runtime
# -----------------------------------------------------------------------------
FROM node:24.18-alpine3.23 AS runtime

# uid/gid must match runAsUser/runAsGroup in k8s/frontend.yaml. The stock `node`
# user is 1000, so a dedicated one is created.
RUN addgroup -g 10001 -S app \
 && adduser -u 10001 -S app -G app

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=build --chown=10001:10001 /app/public ./public
# The standalone bundle carries its own pruned node_modules and server.js.
# `messages/*.json` is compiled into the server bundle by the dynamic import in
# src/i18n/request.ts, so it does not need to be copied separately.
COPY --from=build --chown=10001:10001 /app/.next/standalone ./
COPY --from=build --chown=10001:10001 /app/.next/static ./.next/static

# Written to at runtime (ISR / fetch cache); an emptyDir is mounted here in
# Kubernetes because the root filesystem is read-only.
RUN mkdir -p .next/cache && chown 10001:10001 .next/cache

USER 10001:10001

EXPOSE 3000

CMD ["node", "server.js"]
