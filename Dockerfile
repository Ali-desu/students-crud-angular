# Use a Node base image
FROM node:latest AS build
LABEL authors="Ali"

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire app source
COPY . .

# Build the Angular app
RUN npx ng build --configuration=production

# Use a lightweight web server to serve the app
FROM nginx:latest

# Copy the built app from the previous stage
COPY --from=build /app/dist/student-crud/browser /usr/share/nginx/html

EXPOSE 80
