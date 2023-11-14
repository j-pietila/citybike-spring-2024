# Solita Dev-Academy Spring 2024

### Back-end stack

Nginx - Web server / reverse proxy  
Gunicorn - WSGI HTTP server  
Django - Web application framework  
Django REST framework - Django toolkit for building REST APIs  
PostgreSQL - Relational SQL database

### Front-end stack

React - Front-end library  
Vite - Front-end tooling  
Yarn - Package manager
  
## Building the project

Project has been developed in Debian GNU/Linux and it should build with Debian based Linux distros and macOS.

>All make commands should be run from the project root where Makefile is located.

In order to build the project you will need:

- GNU Make  
- Docker  
- Docker Compose

Build and run project with front-end running with Vite dev server in a container:

    make down build up

Build and run project with production built front-end:
    
    make ENV=staging down build up

Access the web app on http://citybike.localhost after running up containers:

You can create yourself a Django superuser by:

    make createsuperuser

Access Django Admin on http://citybikeadmin.localhost with your created superuser

## Development on localhost
Development localhost environment is defined by setting ENV=dev. This is the default value in Makefile.vars and can optionally be set in .local.env file on project root.
  
Back-end can be developed with Django dev server by running:

    make dev

Back-end development requirements:

- Python 3.11
- Black formatter configured in your IDE of choice

Front-end can be developed by utilizing the frontend container.

Front-end development requirements:
- Node.js >= 20.9.0 LTS
- Yarn >= 4.0.1

>Front-end yarn builds can currently get mixed results for `msw` and `esbuild` package dependencies with builds between the front-end dev container and localhost dev environment. **If front-end dev environment doesn't work correctly, rebuild yarn packages locally with**:

    make rebuild-yarn

If you are using Visual Studio Code as your IDE, you can also install required yarn SDKs by:

    make rebuild-sdks

## Tests and linting

### Back-end

Run all back-end tests with coverage report outside of container:

    make test-local

Run specific back-end tests outside of container by adding `TEST` parameter:

    make test-local TEST=bikes.testing.<test_file>.<test_class>.<test_name>

Run all back-end tests with coverage in container:

    make down build up test

### Front-end

>Front-end yarn builds can currently get mixed results for `msw` and `esbuild` package dependencies with builds between the front-end dev container and localhost dev environment. **If front-end dev environment doesn't work correctly, rebuild yarn packages locally with**:

    make rebuild-yarn

Run front-end tests with watch mode:
    
    make node-test

Run front-end tests once with coverage report:

    make node-test-coverage

Lint front-end with ESLint:

    make node-lint
