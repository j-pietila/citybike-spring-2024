#!/bin/bash

cd /srv/app

yarn rebuild

yarn install

yarn run lint

yarn run build

cp -ar /srv/app/dist/* /run/web/