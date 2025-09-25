# Dockerfile
# Multi-stage build for production deployment
# Compatible with Docker Hub

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Install jq for JSON validation
RUN apk add --no-cache jq

# Copy source code
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER_BUILD=true

# Build-time arguments (no defaults to prevent leaking sensitive data)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_PORT
ARG NEXT_PUBLIC_KAWASAN

# Set environment variables from build args
# These will fail if not provided, preventing accidental leaks
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT}
ENV NEXT_PUBLIC_KAWASAN=${NEXT_PUBLIC_KAWASAN}

# Build-time validation of required arguments
RUN echo "Validating build arguments..." && \
    if [ -z "$NEXT_PUBLIC_API_URL" ]; then \
        echo "ERROR: NEXT_PUBLIC_API_URL build argument is required but not provided"; \
        exit 1; \
    fi && \
    if [ -z "$NEXT_PUBLIC_API_PORT" ]; then \
        echo "ERROR: NEXT_PUBLIC_API_PORT build argument is required but not provided"; \
        exit 1; \
    fi && \
    if [ -z "$NEXT_PUBLIC_KAWASAN" ]; then \
        echo "ERROR: NEXT_PUBLIC_KAWASAN build argument is required but not provided"; \
        exit 1; \
    fi && \
    if ! echo "$NEXT_PUBLIC_KAWASAN" | jq empty 2>/dev/null; then \
        echo "ERROR: NEXT_PUBLIC_KAWASAN must be valid JSON array, got: $NEXT_PUBLIC_KAWASAN"; \
        exit 1; \
    fi && \
    echo "Build arguments validation passed"

RUN pnpm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Runtime environment variables (build-time vars are already inlined)

# Create non-root user untuk security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch ke non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set port environment variable
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start aplikasi
CMD ["node", "server.js"]
