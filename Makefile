include tools/Makefile.vars

venv := $(VIRTUAL_ENV)/bin/python
admin := back-end/manage.py
compose := COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f tools/compose/base.yml -f tools/compose/$(ENV).yml

# Dev tools
venv: $(VIRTUAL_ENV)/bin/activate
$(VIRTUAL_ENV)/bin/activate: back-end/requirements.txt
	test -d $(VIRTUAL_ENV) || python3.11 -m venv $(VIRTUAL_ENV)
		$(venv) -m ensurepip --upgrade; \
		$(venv) -m pip install -r back-end/dev-requirements.txt
		$(venv) -m pip install -r back-end/requirements.txt
		touch $(VIRTUAL_ENV)/bin/activate

update-requirements:
	source $(VIRTUAL_ENV)/bin/activate; \
	cd back-end; \
	pip-compile dev-requirements.in; \
	pip-compile requirements.in

dev: venv db
	$(venv) $(admin) runserver

shell: venv
	$(venv) $(admin) shell

createsuperuser: venv
	$(venv) $(admin) createsuperuser

# Project building
build:
	$(compose) build --pull

up:
	$(compose) up -d

down:
	$(compose) down --remove-orphans

db:
	$(compose) up -d db

# Back-end testing
test:
	$(compose) exec -T app bash -c 'DJANGO_SETTINGS_MODULE=citybike.settings \
	&& DJANGO_DEBUG=false \
	&& pip install coverage \
	&& coverage erase \
	&& coverage run manage.py test --keepdb \
	&& coverage report'

test-local: venv db
	source $(VIRTUAL_ENV)/bin/activate \
		&& cd back-end \
		&& coverage erase \
		&& coverage run --source=$(TEST) manage.py test $(TEST) \
		--settings=citybike.settings --keepdb \
		&& coverage report

# Front-end linting and testing
node-lint:
	cd front-end && yarn lint

node-test:
	cd front-end && yarn test

node-test-coverage:
	cd front-end && yarn coverage

# Database
psql:
	$(compose) exec db psql -U $(POSTGRES_APP_DB_USER) -d $(POSTGRES_APP_DB) -p 5432

makemigrations: venv
	$(venv) $(admin) makemigrations

migrate: venv
	$(venv) $(admin) migrate
