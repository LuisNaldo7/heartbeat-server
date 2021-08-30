# Heartbeat-Server

The Heartbeat-Server receives notifications from its [Heartbeat-Clients](https://github.com/LuisNaldo7/heartbeat-client) and provides an endpoint to view their states using the [Heartbeat-Dashboard](https://github.com/LuisNaldo7/heartbeat-dashboard).

## Components

[Heartbeat-Client](https://github.com/LuisNaldo7/heartbeat-client)

[Heartbeat-Server](https://github.com/LuisNaldo7/heartbeat-server)

[Heartbeat-Alert](https://github.com/LuisNaldo7/heartbeat-alert)

[Heartbeat-Dashboard](https://github.com/LuisNaldo7/heartbeat-dashboard)

![Diagram](https://github.com/LuisNaldo7/heartbeat-local-dev-env/blob/main/docs/components.png?raw=true)

---
A full integration can be set up using the [Local Development Environment](https://github.com/LuisNaldo7/heartbeat-local-dev-env).
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

An OpenAPI documentation is available at `http://localhost:3000/api`.

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
