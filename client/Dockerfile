# CONFIGURATION
FROM node:16

## SERVER

### SETUP
# WORKDIR /server
### BUILD
# COPY . .
# RUN npm install
### START
# RUN node server.js

## CLIENT

### SETUP
WORKDIR /client
### BUILD
RUN npm install
COPY . . 
### RUN
EXPOSE 3000
CMD [ "npm", "start" ]