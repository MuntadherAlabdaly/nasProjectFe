# Use official Node.js base image
FROM node:20.18.0-slim AS base

LABEL fly_launch_runtime="Next.js"

# Set working directory for the app
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install necessary dependencies for building node modules
FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npx next build --experimental-build-mode compile

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application from previous stage
COPY --from=build /app /app

# Ensure entrypoint script is executable
RUN chmod +x /app/docker-entrypoint.js

# Entrypoint sets up the container
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Expose the port for the app
EXPOSE 8000

# Start the Next.js server
CMD [ "npm", "run", "dev" ]
