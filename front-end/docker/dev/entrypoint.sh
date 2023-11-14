#!/bin/bash

# Remove possible production built front-end from
# web-root volume to let Nginx serve dev front-end container
rm  /run/web/index.html
rm -rf /run/web/assets


cd /run/src/app

yarn install
yarn dev --host