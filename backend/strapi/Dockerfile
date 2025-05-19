FROM node:18-alpine

# Install dependencies
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Strapi application
RUN npm run build

# Expose the Strapi port
EXPOSE 1337

# Start the Strapi application
CMD ["npm", "run", "develop"]
