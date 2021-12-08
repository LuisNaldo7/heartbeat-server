# Build stage
FROM node:16.13.1 AS build

## Create app directory
WORKDIR /app

## Install app dependencies
COPY tsconfig*.json package*.json ./
RUN npm ci --only=production

## Bundle app source
COPY ./src ./src

## Build app
RUN npm run build



# Run stage
FROM node:16.13.1

## Declare env vars
ENV HEARTBEAT_SERVER_PORT=3000

ENV TYPEORM_CONNECTION=mysql
ENV TYPEORM_HOST=localhost
ENV TYPEORM_PORT=3306
ENV TYPEORM_USERNAME=heartbeat
ENV TYPEORM_PASSWORD=password
ENV TYPEORM_DATABASE=heartbeat
ENV TYPEORM_SYNCHRONIZE=false
ENV TYPEORM_LOGGING=false
ENV TYPEORM_ENTITIES=dist/**/*.entity.js
ENV TYPEORM_DRIVER_EXTRA='{ "ssl": { "rejectUnauthorized": false } }'

## Create app directory
WORKDIR /app

## Copy app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

## Execute app
CMD [ "node", "dist/main"]

## Expose port
EXPOSE 3000
