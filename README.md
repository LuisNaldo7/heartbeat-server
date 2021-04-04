# Heartbeat-Server

## Run

    npm start

## Run in Docker

build image
    
    docker build -t luisnaldo7/heartbeat-server:latest .

execute image

    docker run -d -p 3000:3000 -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" --rm --name heartbeat-server luisnaldo7/heartbeat-server:latest

run container on boot

    docker run -d -p 3000:3000 -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" --restart always --name heartbeat-server luisnaldo7/heartbeat-server:latest
