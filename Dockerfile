# ---- Builder Stage ----
# Base image: Node.js Alpine
FROM node:22.16.0-alpine AS builder
WORKDIR /app

# Enable Corepack to use pnpm version from package.json's "packageManager" field
# Ensure "packageManager": "pnpm@10.11.0" (or your version) is in package.json
RUN corepack enable pnpm

# Copy package manifests for optimized layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Docusaurus site
RUN pnpm build

# Remove devDependencies for smaller production node_modules
RUN pnpm prune --prod

# ---- Final Stage ----
# Base image: Node.js Alpine
FROM node:22.16.0-alpine
WORKDIR /app

# Install curl for health checks (as root before switching user)
RUN apk add --no-cache curl

# Enable Corepack to use pnpm version from package.json's "packageManager" field
# This ensures 'pnpm run serve' can find the correct pnpm version
RUN corepack enable pnpm

# Set production environment
ENV NODE_ENV=production

# Switch to non-root user for security
USER node
# Re-declare WORKDIR after USER for clarity and to ensure correct permissions
WORKDIR /app

# Copy Docusaurus build output from builder stage
COPY --from=builder --chown=node:node /app/build ./build

# Copy production-ready node_modules and package.json
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
# pnpm-lock.yaml is not strictly required in the final image if node_modules is fully populated
# and no 'pnpm install' is run. Omitting can slightly reduce image size.

# Expose application port
EXPOSE 8080

# Application health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start application using "serve" script from package.json
# Assumes "scripts": { "serve": "serve -s build -l tcp://0.0.0.0:${PORT:-8080}" } in package.json
CMD ["pnpm", "run", "serve"]
