FROM node:20.9.0-bullseye-slim

WORKDIR /srv/app

# Set up Yarn
RUN corepack enable
RUN corepack prepare yarn@4.0.1 --activate

COPY ./docker/prod/entrypoint.sh /srv/app/scripts/entrypoint.sh
COPY . /srv/app

ENTRYPOINT [ "bash", "/srv/app/scripts/entrypoint.sh" ]
