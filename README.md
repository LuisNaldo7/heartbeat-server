# Heartbeat-Server

## Run

Copy .env.example to .env and adjust values.

install dependencies
```bash
npm i
```

start app
```bash
npm start
```
## Run in Docker

pull image
```bash
docker pull luisnaldo7/heartbeat-server:latest
```

or build image
```bash   
docker build -t luisnaldo7/heartbeat-server:latest .
```

execute container
```bash 
docker run -d -p 3000:3000 -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" --rm --name heartbeat-server luisnaldo7/heartbeat-server:latest
```

execute container on boot
```bash 
docker run -d -p 3000:3000 -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" --restart always --name heartbeat-server luisnaldo7/heartbeat-server:latest
```