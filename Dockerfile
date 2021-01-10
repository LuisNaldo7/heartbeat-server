FROM node:lts

ENV CONFIG_FILE="/config/config.json"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

# Bundle app source
COPY ./src ./src

EXPOSE 3000
CMD [ "npm", "start"]