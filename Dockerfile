FROM node:16.13.1

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

# Create app directory
WORKDIR /app

# Install app dependencies
COPY tsconfig*.json package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY ./src ./src

# Build app
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main"]