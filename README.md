# Solita Dev-Academy Spring 2024 Exercise

## Back-end stack
- Gunicorn - WSGI HTTP server
- Django - Wep application framework
- Django REST framework - Django toolkit for building REST APIs
- PostgreSQL - Relational SQL database

## Front-end stack
- React - Front-end library
- Vite - Front-end tooling
- Yarn - Package manager

# Building the project
In order to build the project you will need:
- GNU Make
- Docker
- Docker Compose

To build the project on localhost, run the following make command:
- make build up

To access the web app on localhost after running up the containers:
- go to http://citybike.localhost

To access Django Admin on localhost after running up the containers:
- create a superuser for yourself by running the following make command:
    - make createsuperuser
- go to http://citybikeadmin.localhost and log-in with your created superuser

## Development on localhost
To run local back-end development environment, run the following make commands:
- make build db
- make dev

Front-end can be developed by utilizing the frontend container run in dev environment.

Back-end development requirements:
- Python >= 3.11

Front-end development requirements:
- Node.js >= 20.9.0 LTS
- Yarn >= 4.0.1
