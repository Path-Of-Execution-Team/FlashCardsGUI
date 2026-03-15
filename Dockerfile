# ---- Build ----
FROM --platform=$BUILDPLATFORM node:22.17-alpine3.22 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
RUN apk add --no-cache libc6-compat
ENV HUSKY=0
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts

FROM base AS builder
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps g++ make python3
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json next.config.ts next-env.d.ts tsconfig.json ./
COPY messages ./messages
COPY public ./public
COPY src ./src

RUN --mount=type=cache,target=/root/.npm npm run build

RUN apk del .build-deps

FROM node:22.17-alpine3.22 AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

USER node

COPY --chown=root:root --chmod=0555 --from=builder /app/.next/standalone ./
COPY --chown=root:root --chmod=0555 --from=builder /app/.next/static ./.next/static
COPY --chown=root:root --chmod=0555 --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
