# Solita Dev-Academy Spring 2024 Exercise

## Back-end stack
- Nginx - Web server / reverse proxy
- Gunicorn - WSGI HTTP server
- Django - Web application framework
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
Back-end can be developed in localhost dev environment, by running the following make commands:
- make build db
- make dev

Front-end can be developed in the frontend container run in dev environment.

Front-end can be linted with ESLint by running the following make command:
- make node-lint

Back-end development requirements:
- Python >= 3.11
- Black formatter configured in your IDE

Front-end development requirements:
- Node.js >= 20.9.0 LTS
- Yarn >= 4.0.1

## Running tests
Back-end tests can be run in container, or on localhost dev environment.

To run tests on localhost dev environment, run the following make command:
- make test-local

To run specific tests on localhost dev environment, add TEST parameter:
- make test-local TEST=bikes.testing.<test_file>.<test_class>.<test_name>

To run all tests in containers, run the following make command:
- make down build up
- make test

Front-end tests can be run on localhost dev environment.

To run tests on localhost with watch mode, run the following make command:
- make node-test

To run tests on localhost once with coverage, run the following make command:
- make node-coverage
