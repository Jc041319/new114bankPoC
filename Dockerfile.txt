# Use the official Node.js image as the base image
# FROM node:18-alpine

# Stage 1: Build the React app
FROM node:18 AS build

# Set environment variables
# ENV NEXT_PUBLIC_NODE_SERVER_ENDPOINT=https://bpi-node-server.1l8l39u5d7xo.jp-tok.codeengine.appdomain.cloud/api

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the Vite app
RUN npm run build

# Serve the app using Nginx
FROM nginx:alpine

# Copy the built app from the build stage to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html


# Expose the port that the app will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
