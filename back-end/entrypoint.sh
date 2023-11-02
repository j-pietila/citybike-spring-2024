#!/bin/bash

django-admin migrate --fake
django-admin migrate
django-admin collectstatic --noinput
mkdir -p /run/web/static/ && cp -ar /run/src/app/citybike/citybike_static/* /run/web/static/

gosu gunicorn "$@"

gunicorn -c gunicorn.conf.py citybike.wsgi
