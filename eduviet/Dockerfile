# Use Node.js 18 as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build for production
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]