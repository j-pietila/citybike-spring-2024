#!/bin/bash

django-admin migrate

gosu gunicorn "$@"

gunicorn -c gunicorn.conf.py citybike.wsgi
