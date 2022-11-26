# CONFIGURATION
FROM node:16

## BUILD TIME
WORKDIR /server
COPY package*.json .
RUN npm install
COPY . .

## EXECUTION TIME
EXPOSE 3001
CMD ["node", "server.js"]