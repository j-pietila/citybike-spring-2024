include tools/Makefile.vars

venv := $(VIRTUAL_ENV)/bin/python
admin := back-end/manage.py
compose := COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f tools/compose/base.yml -f tools/compose/$(ENV).yml

# Dev tools
venv: $(VIRTUAL_ENV)/bin/activate
$(VIRTUAL_ENV)/bin/activate: back-end/requirements.in
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

# Docker
build:
	$(compose) build --pull

up:
	$(compose) up -d

down:
	$(compose) down --remove-orphans

db:
	$(compose) up -d db

# Database
psql:
	$(compose) exec db psql -U $(POSTGRES_APP_DB_USER) -d $(POSTGRES_APP_DB) -p 5432

makemigrations: venv
	$(venv) $(admin) makemigrations

migrate: venv
	$(venv) $(admin) migrate