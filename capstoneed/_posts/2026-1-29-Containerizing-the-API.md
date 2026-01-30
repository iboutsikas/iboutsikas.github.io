---
layout: post
title: "Putting the Rails on Docker: Containerizing a Rails API"
image:
  path: /assets/img/capstoneed/rails_on_docker.png
related_posts:
    - "capstoneed/_posts/2026-1-30-Containerizing-Angular.md"
---

* toc goes here
{:toc}

One of my primary goals with CapstoneED v2 was to have the repo be
self-contained and easy to spin up. In this post I will document the process I
went through to dockerize everything, as well as the decisions I made along the
way.

I have been developing the application as time permits, and these posts are not
necessarily in the chronological order that things were implemented in. 
{:.note}

# Intro
First let me set the scene of what we are working with. There is 1 mono-repo
that includes everything, and part of that mono-repo is a git submodule to the
API repo. This way, I can still only "clone one repo" and get going, while not
losing any of the history in the API repo. These are the files we will be
working with today:

```
capstoneed/
├── apps/
│   └── api/
│       └── Dockerfile
├── docker-compose.base.yml
└── docker-compose.yml
```

The root `docker-compose.yml` and `docker-compose.base.yml` are used to
orchestrate everything in the mono-repo. The root `Dockerfile` is used to build
and "deploy" the angular apps. `apps/api/Dockerfile` is used to build and deploy
the api itself.

The way I have strutured things is that `docker-compose.base.yml` includes all
of the common services, configuration, etc, while `docker-compose.yml` extends
those services and groups them in profiles. For example, let's say we have the
following in base:
```yml
# in docker-compose.base.yml
services:
  database:
    image: postgres:17
  ports:
    - "5432:5432"
    # ... omitted for brevity
```
Then in our compose file we can setup the following:

```yml
# in docker-compose.yml
services:
  database-dev:
    extends: 
    file: docker-compose.base.yml
    service: database # This name must match the service in above file
  profiles: ["backend-dev"]
  ports:
    - "5480:5432" # 5432 is for the production database, we use 5480 in dev
```

What this affords is to share common config while overriding whatever we need
per profile. Now by running `docker compose --profile backend-dev up`, docker
will bring up everything that has `backend-dev` in their profiles list AND
everything that has no profile attached. That last part is really important, as
it can be used to have services that always run, but it can also cause
unintended conflicts with ports, etc.

A word of caution: You can NOT remove values when extending.
{:.note}


# Dockerfile
I am going to start with the Rails API first. A lot of build is based on the
[docker docs for Rails](https://docs.docker.com/guides/ruby/containerize/), but
I have also heavily modified it for proper local development. So let's start
with our Dockerfile layout:

```dockerfile
ARG RUBY_VERSION=3.4.7
ARG RAILS_UID=1000
ARG RAILS_GID=1000

####################################
# Base
####################################
FROM ruby:${RUBY_VERSION}-slim AS base
# Do things that are needed in both prod and dev
# i.e. apt-get install dependencies, postgres client, etc.

ARG RAILS_GID
ARG RAILS_UID

RUN groupadd --system --gid ${RAILS_GID} rails
RUN useradd rails --uid ${RAILS_UID} --gid ${RAILS_GID} --create-home --shell /bin/bash

####################################
# Development
####################################
FROM base AS development

# bundle install, set environment to development, etc

ARG RAILS_GID
ARG RAILS_UID
USER ${RAILS_UID}:${RAILS_GID}

ENTRYPOINT ["/opt/app/bin/dev-entrypoint.sh"]
EXPOSE 3000
CMD ["rails", "server", "-b",  "0.0.0.0"]

####################################
# Production Build
####################################
FROM base AS production-build
# Most of the stuff in here is from 
# https://docs.docker.com/guides/ruby/containerize/
# like running precompile and setting any additional 
# environment stuff needed

####################################
# Production
####################################
FROM base AS production

COPY --from=production-build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=production-build /opt/app /opt/app

RUN chown -R rails:rails db log storage tmp

ARG RAILS_GID
ARG RAILS_UID
USER ${RAILS_UID}:${RAILS_GID}

ENTRYPOINT ["/opt/app/bin/docker-entrypoint.sh"]
EXPOSE 3000
CMD ["./bin/rails", "server"]

```

That is a lot of dockerfile even though I tried to abbreviate it as much as
possible. My goal with this file was to break it into cacheable stages to reduce
churn and wait times when running docker build.

There are a couple of things that I would like to point out here. First is the
fact that we are creating a rails:rails user:group and running rails through it.
The reason is two fold:
1. Security: If for whatever reason the rails process is compromized you are not
   running as root.
2. Easy of use in dev: If you run the application as root in dev and you are
   mounting the local source code into the container, you will end up creating
   files owned by the root user. For instance, `app/log/development.log` or the
   various files in `app/tmp`, like the server.pid. Which can result into
   permission errors down the line.

The other thing that I would like to point out is that both dev and prod have an
entrypoint.sh file. For production I am using the one from the
[docs](https://docs.docker.com/guides/ruby/containerize/). For development
however, I am using the following script:

```bash
#!/bin/bash -e

PID_FILE="tmp/pids/server.pid"
if [[ -f "$PID_FILE" ]]; then
    rm -f "$PID_FILE"
fi

if [[ -v WITH_DEBUGGER ]]; then
    bundle exec rdbg --open=vscode --host 0.0.0.0 --port 1234 -- "${@}"
else
    exec "${@}"
fi
```

This script makes sure the pid file is cleared at startup, which in theory could
be an issue if you are not carefull. The reason I needed this functionality is
because sometimes when terminating the container it might not be a gracefull
shut down, which leaves the PID behind. The other benefit is that it allows me
to define `WITH_DEBUGGER` in the compose file and it will automatically wait for
me to attach from vscode. This last part could be more configurable, but it
works good enough for now.

# Putting it together in compose

Now in my compose file I can have the following, which allows me to have both
the database and the API under one profile and bring them up at once. The
actuall compose file has more stuff to handle environment files, etc, but you
get the gist.

```yml
postgres-dev:
  extends: 
    file: docker-compose.base.yml
    service: database-base
  profiles: ["backend-dev"]
  environment:
    # Environment variables
  ports:
    - "5432:5432"

api-dev:
  extends: 
    file: docker-compose.base.yml
    service: api-base
  build:
    target: development
  profiles: ["backend-dev"]
  environment: 
    # Other environmant variables
    - WITH_DEBUGGER=1
 ports:
    - 1234:1234 # for the debugger
volumes: 
    - "./apps/api:/opt/app"
depends_on:
    - postgres-dev
```