# ---- Builder Stage ----
# Base image: Node.js Alpine
FROM node:24.20.0-alpine AS builder
WORKDIR /app

# Enable Corepack to use the pnpm version from package.json's "packageManager" field
RUN corepack enable pnpm

# Copy package manifests for optimized layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Docusaurus site
RUN pnpm build

# ---- Runtime Dependencies Stage ----
# The final image only serves static files, so it needs http-server alone.
# Installing the full production tree here would ship build-time-only packages
# (mermaid, react, @docusaurus/*) that dominate the image size.
# The version range is read from package.json so this cannot drift from it.
FROM node:24.20.0-alpine AS runtime-deps
WORKDIR /srv
COPY package.json /tmp/package.json
RUN npm install --no-audit --no-fund --no-package-lock \
      "http-server@$(node -p "require('/tmp/package.json').dependencies['http-server']")"

# ---- Final Stage ----
# Base image: Node.js Alpine
FROM node:24.20.0-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Switch to non-root user for security
USER node
# Re-declare WORKDIR after USER for clarity and to ensure correct permissions
WORKDIR /app

# Copy Docusaurus build output from builder stage
COPY --from=builder --chown=node:node /app/build ./build

# Copy the runtime-only node_modules (http-server) and package.json
COPY --from=runtime-deps --chown=node:node /srv/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
# pnpm-lock.yaml is not strictly required in the final image if node_modules is fully populated
# and no 'pnpm install' is run. Omitting can slightly reduce image size.

# Expose application port
EXPOSE 8080

# Start http-server directly (no pnpm/corepack at runtime).
# Rationale: pnpm 11's `pnpm run` verifies deps and auto-runs `pnpm install`
# when pnpm-lock.yaml is absent (as in this image), crashing on the root-owned
# /app (EACCES). Direct invocation also removes the cold-start dependency on
# downloading pnpm from the npm registry via Corepack.
# (equivalent to package.json "serve": "http-server ./build --single")
CMD ["node", "node_modules/http-server/bin/http-server", "./build", "--single", "-p", "8080"]
