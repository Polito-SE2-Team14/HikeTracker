# CONFIGURATION
FROM node:16

## BUILD TIME
WORKDIR /server
COPY . .
RUN npm install

## EXECUTION TIME
EXPOSE 3001
CMD ["node", "server.js"]