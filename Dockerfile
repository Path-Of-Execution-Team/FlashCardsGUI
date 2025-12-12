FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV HUSKY=0

COPY package.json package-lock.json* ./ 

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]