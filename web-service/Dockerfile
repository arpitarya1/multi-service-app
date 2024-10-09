# Stage 1: Build
FROM node:14 AS build
WORKDIR /app
# Set user and group
RUN groupadd -g 1002 nodegroup && useradd -u 1002 -g nodegroup nodeuser
USER nodeuser

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install
RUN npm install --save-dev @babel/cli @babel/core @babel/preset-env
 
# Copy the source code and build the application
COPY . .
RUN npm run build
 
# Stage 2: Run
FROM node:14
WORKDIR /app
# Set user and group
RUN groupadd -g 1002 nodegroup && useradd -u 1002 -g nodegroup nodeuser
USER nodeuser
# Copy the necessary files from the build stage
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules/ ./node_modules/
 
# Set environment variables
ENV NODE_ENV=production
 
# Expose the port the app runs on (adjust as needed)
EXPOSE 3000
 
# Start the application
CMD ["node", "dist/app.js"]