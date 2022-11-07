# CONFIGURATION
FROM node:16
WORKDIR /client
COPY package*.json ./
# BUILD
RUN npm install
# RUN
COPY . . 
EXPOSE 3000
CMD [ "npm", "start" ]