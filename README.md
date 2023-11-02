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