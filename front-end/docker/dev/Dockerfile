FROM node:20.9.0-bullseye-slim

WORKDIR /run/src/app

# Set up Yarn
RUN corepack enable
RUN corepack prepare yarn@4.0.1 --activate

COPY ./docker/dev/entrypoint.sh /run/src/scripts/entrypoint.sh

EXPOSE 5173

ENTRYPOINT [ "bash", "/run/src/scripts/entrypoint.sh" ]
