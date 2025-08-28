FROM --platform=$BUILDPLATFORM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM base AS builder
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps python3 make g++
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/root/.npm npm run build

RUN apk del .build-deps

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

USER node

COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static     ./.next/static
COPY --chown=node:node --from=builder /app/public            ./public

EXPOSE 3000
CMD ["node", "server.js"]
