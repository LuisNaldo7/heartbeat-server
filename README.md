# Heartbeat-Server

## Run

    npm start

## Run in Docker

build image
    
    docker build -t luisnaldo7/heartbeat-server:latest .

execute image

    docker run -d -p 3000:3000 -v ~/.config/heartbeat-server/:/config --rm --name heartbeat-server luisnaldo7/heartbeat-server:latest

run container on boot

    docker run -d -p 3000:3000 -v ~/.config/heartbeat-server/:/config --restart always --name heartbeat-server luisnaldo7/heartbeat-server:latest
