# ---- Builder Stage ----
# Base image: Node.js Alpine
FROM node:22.16.0-alpine AS builder
WORKDIR /app

# Enable Corepack to use pnpm version from package.json's "packageManager" field
RUN corepack enable pnpm

# Copy package manifests for optimized layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Docusaurus site
RUN pnpm build

# ---- Final Stage ----
# Base image: Node.js Alpine
FROM node:22.16.0-alpine
WORKDIR /app

# Install curl for health checks (as root before switching user)
RUN apk add --no-cache curl

# Enable Corepack to use pnpm version from package.json's "packageManager" field
RUN corepack enable pnpm

# Set production environment and PORT for Cloud Run
ENV NODE_ENV=production
ENV PORT=8080

# Switch to non-root user for security
USER node
# Re-declare WORKDIR after USER for clarity and to ensure correct permissions
WORKDIR /app

# Copy Docusaurus build output from builder stage
COPY --from=builder --chown=node:node /app/build ./build

# Copy production-ready node_modules and package.json
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

# Expose application port (Cloud Run automatically uses the PORT env var)
EXPOSE 8080

# Application health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# --- highlight-start ---
# Start application using Docusaurus's official serve command for production
# This correctly handles multi-language routing.
CMD ["pnpm", "docusaurus", "serve", "--build", "--host", "0.0.0.0", "--port", "8080"]
# --- highlight-end ---
