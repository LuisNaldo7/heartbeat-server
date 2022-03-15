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

```
npm i
```

start app

```
npm start
```

An OpenAPI documentation is available at `http://localhost:3000/api`.

## Run in Docker

pull image

```
docker pull luisnaldo7/heartbeat-server:latest
```

or build image

```
docker build -t luisnaldo7/heartbeat-server:latest -f docker/Dockerfile .
```

execute container

```
docker run -d -p 3000:3000 -e TYPEORM_HOST="localhost" -e TYPEORM_PASSWORD="pass" --rm --name heartbeat-server luisnaldo7/heartbeat-server:latest
```

execute container on boot

```
docker run -d -p 3000:3000 -e TYPEORM_HOST="localhost" -e TYPEORM_PASSWORD="pass" --restart always --name heartbeat-server luisnaldo7/heartbeat-server:latest
```
