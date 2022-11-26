# CONFIGURATION
FROM node:16

## BUILD TIME
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

## EXECUTION TIME
EXPOSE 3000
CMD ["npm", "start"]