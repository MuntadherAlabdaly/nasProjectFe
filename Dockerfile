# Use Node.js Alpine as the base image
FROM node:alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight production image
FROM node:alpine AS runner

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8000

# Expose port 8000 for Fly.io
EXPOSE 8000

# Start the Next.js application on port 8000
CMD ["npm", "run", "start"]
