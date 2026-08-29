# KCB Labs — labs.kcb.ma
# Multi-stage Docker: install → build → runtime (node:22, port 4321, entry ./dist/server/entry.mjs)
# Verified against @astrojs/node standalone docs (mcp.docs.astro.build/mcp)

# Stage 1 — install + build
FROM node:22-alpine AS builder
WORKDIR /app

# Install deps (leverage cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — slim runtime
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copy only prod essentials
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
