---
title: "The Saga Continues: Hosting Angular Apps in Docker"
date: 2026-01-30
categories: ["capstoneed"]
description: >
    Leveraging the power of Nx monorepos to simplify deployment: how I use multi-stage Docker builds and NGINX to host Angular applications.
---

In my [previous post]({{< relref "/posts/capstoneed/containerizing-the-api" >}})
I went over the Docker setup I came up with for the Rails API. In this post
I will do the same for the two frontends, and it should be much shorter!

## The Dockerfile

For now, the primary goal is to have the built versions of the applications
available inside a container for demo purposes. I do not think it makes sense to
use Docker for development as it would make interacting with the Nx CLI a lot
more cumbersome. Speaking of Nx, the mono-repo is going to be a huge boon to us
today as it will make the entire deployment dead simple.

Let's take a look at the files we will be working with today.
`docker-compose.base.yml` and `docker-compose.yml` serve the same purpose we saw
[last time]({{< relref "/posts/capstoneed/containerizing-the-api" >}}).
The TL;DR is that `docker-compose.base.yml` defines shared configuration, and then
`docker-compose.yml` extends it to provide profiles and development/production
specifics.

```
capstoneed/
├── apps/
│   ├── student-frontend
│   └── lecturer-frontend
├── docker-compose.base.yml
├── docker-compose.yml
└── Dockerfile
```

The root `Dockerfile` is responsible for building the Angular apps. Here it is,
in all its short glory. We start with a builder stage that can be cached. This
is where a mono-repo shines as well, since I can build everything in one step.
Then for the final container we just copy the application to where NGINX serves
from and we are almost ready to go.

```dockerfile
####################################
# Builder
####################################
FROM node:24-alpine AS builder

WORKDIR /repo

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx nx run-many --target=build --all


####################################
# production
####################################
FROM nginx:alpine AS production
ARG APP_NAME

# These will be highly dependant on your setup. Be careful
#                       👇👇👇👇👇👇👇👇👇👇👇👇        👇👇👇👇👇👇👇👇👇 
COPY --from=builder /repo/dist/apps/${APP_NAME}/browser /usr/share/nginx/html/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Using the container in compose

Now we can use this Dockerfile in our compose to tie it in with the API. We can
use the build args to define which app we want copied to the final container. I
also have built in the ability to inject environment variables to the apps at
compile time, but that is a post for another time (if you are really interested
[this](https://nx.dev/docs/technologies/angular/guides/use-environment-variables-in-angular#using-a-custom-esbuild-plugin)
can get you started).

```yml
services:
  database-prod:
    profiles: ["production"]
    # ... Other config ...
  api-prod:
    profiles: ["production"]
    # ... Other config ...

  student-frontend:
    profiles: ["production"]
    build:
        context: .
        dockerfile: Dockerfile
        args:
        #             👇👇  Which app to copy to the final container
        APP_NAME: "student-frontend"
        # 👇👇👇👇👇👇  Environment variables used in the build step.
        CAPSTONEED_API_URL: "http://localhost:3000/v1"
    volumes:
        - "./nginx/student-frontend.conf:/etc/nginx/conf.d/default.conf:ro"
    networks:
        - capstoneed-network
```

The important part of this configuration is mounting the nginx config. I decided
to take complete control of `default.conf` as this server should only ever serve
one site. My decision goes against the way nginx usually works with
`available-sites` and `enabled-sites`, but that is flexibility I do not actually
need in this scenario. Let's see the config itself:

```conf
server {
    listen 80 default_server;
    server_name localhost;
    
    root /usr/share/nginx/html/app; 
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The file above is configured with the assumption that there will be another
reverse proxy in front of everything (also a post for another time). By setting
it as `default_server` it will respond no matter what domain we come from, and
it is up to the reverse proxy to handle the correct domains. This is OK to do as
I have not exposed the container in any way to the host and it is instead
attached to a Docker network. That way it will be accessible from the reverse
proxy, but not the network.

If you do not want to have a reverse proxy, you could use something like this
for localhost, just make sure to expose port 4500 (or whatever number you
decide) in `docker-compose.yml`.

```conf
server {
    listen 4500;
    server_name localhost;
    
    root /usr/share/nginx/html/app; 
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Wrap up

At this point we have a flexible setup that gives us commands like
`docker compose --profile backend-dev up` to start only the backend in
development mode, or `docker compose --profile production up` to bring up the
database, API, and frontend(s) in "production" mode (realistically demo mode
for me).
