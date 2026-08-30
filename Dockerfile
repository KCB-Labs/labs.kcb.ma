# KCB Labs — labs.kcb.ma
# Multi-stage Docker: install → build → runtime (node:22, port 4321, entry ./dist/server/entry.mjs)
# Verified against @astrojs/node standalone docs (mcp.docs.astro.build/mcp)

# Build args for Keystatic (required at build time)
ARG KEYSTATIC_GITHUB_CLIENT_ID
ARG KEYSTATIC_GITHUB_CLIENT_SECRET
ARG KEYSTATIC_SECRET
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ARG KEYSTATIC_GITHUB_REPO

# Stage 1 — install + build
FROM node:22-alpine AS builder
WORKDIR /app

# Set build-time env vars for Keystatic
ENV KEYSTATIC_GITHUB_CLIENT_ID=$KEYSTATIC_GITHUB_CLIENT_ID
ENV KEYSTATIC_GITHUB_CLIENT_SECRET=$KEYSTATIC_GITHUB_CLIENT_SECRET
ENV KEYSTATIC_SECRET=$KEYSTATIC_SECRET
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ENV KEYSTATIC_GITHUB_REPO=$KEYSTATIC_GITHUB_REPO

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
# Keystatic runtime env (also injected by Coolify, duplicated for explicitness)
ARG KEYSTATIC_GITHUB_CLIENT_ID
ARG KEYSTATIC_GITHUB_CLIENT_SECRET
ARG KEYSTATIC_SECRET
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ARG KEYSTATIC_GITHUB_REPO
ENV KEYSTATIC_GITHUB_CLIENT_ID=$KEYSTATIC_GITHUB_CLIENT_ID
ENV KEYSTATIC_GITHUB_CLIENT_SECRET=$KEYSTATIC_GITHUB_CLIENT_SECRET
ENV KEYSTATIC_SECRET=$KEYSTATIC_SECRET
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ENV KEYSTATIC_GITHUB_REPO=$KEYSTATIC_GITHUB_REPO

# Copy only prod essentials
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
