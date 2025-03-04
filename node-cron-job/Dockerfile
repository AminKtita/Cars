# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the cron job script
COPY cron.js .

# Start the cron job
CMD ["node", "cron.js"]