# CONFIGURATION
FROM node:16

## SERVER

### SETUP
WORKDIR /server
### BUILD
COPY . .
RUN npm install
### START
RUN node server.js

## CLIENT

### SETUP
WORKDIR /client
### BUILD
COPY . . 
RUN npm install
### RUN
EXPOSE 3000
CMD [ "npm", "start" ]