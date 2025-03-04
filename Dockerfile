# Use official Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application source
COPY backend ./

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]
