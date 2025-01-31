# Use Node.js Alpine as the base image
FROM node:alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight production image
FROM node:alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app /app

# Set environment to production
ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 8000

# Start the Next.js application
CMD ["npm", "run", "start"]
