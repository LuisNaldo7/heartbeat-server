FROM node:lts

ENV HEARTBEAT_DB_HOST='localhost'
ENV HEARTBEAT_DB_PORT=3307
ENV HEARTBEAT_DB_SSL=true
ENV HEARTBEAT_DB_USER='heartbeat'
ENV HEARTBEAT_DB_PASSWORD=''
ENV HEARTBEAT_DB_DATABASE='heartbeat'

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci --only=production

# Bundle app source
COPY ./src ./src

# Build app
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main"]