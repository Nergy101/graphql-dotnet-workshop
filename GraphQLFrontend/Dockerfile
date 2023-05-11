# Use node-alpine as the base image
FROM node:20.1-alpine3.16 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application files to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx as the base image
FROM nginx:1.24.0-alpine-slim

# Copy the built Angular app from the previous stage to the Nginx container
COPY --from=build /app/dist/graph-qlfrontend /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
