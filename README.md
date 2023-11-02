# Solita Dev-Academy Spring 2024 Exercise

## Back-end stack
- Gunicorn - WSGI HTTP server
- Django - Wep application framework
- Django REST framework - Django toolkit for building REST APIs
- PostgreSQL - Relational SQL database

## Back-end dependencies
In order to build the project you will need:
- Python (>= 3.11)
- GNU Make
- Docker
- Docker Compose

# Building the project
To build the project on localhost, run the following make command:
- make build up

## Development on localhost
To create local development environment, run the following make commands:
- make build db
- make venv
- make dev

## Django Admin on localhost
You can create a superuser for yourself by running the following make command:
- make createsuperuser

After that you can log-in to Django Admin by going to http://citybikeadmin.localhost/