#!/usr/bin/make -f
BRANCH := $(shell git name-rev --name-only HEAD)
ENDPOINT := server.js
SERVICE_NAME := dcard
PORT := 3003
CONFIG := ecosystem.config.js

.PHONY: test

container-build:
	@echo ">>> Build Services (Docker Container)......"
	docker-compose build --parallel

build: container-build
	@echo ">>> Builing packages"
	npm install

restart: stop start
	@echo ">>> Restart NodeJS Service by PM2"

# We use reload instead
reload:
	@echo ">>> Reload PM2 Service"
	pm2 reload $(CONFIG)

docker-start: cp_conf
	docker-compose up -d --no-recreate
	@echo ">>> Start: Visit http://localhost:3003 ...."

# For Ubuntu Server
docker-stop:
	@echo ">>> Stop container......"
	docker-compose stop && rm -r /tmp/conf && rm -r /tmp/sql

start: docker-start pm2-start
	@echo ">>> Starting Server"

stop: pm2-stop docker-stop
	@echo ">>> Stopping Server"

pm2-start:
    NODE_PORT=$(PORT) pm2 start $(ENDPOINT) --name $(SERVICE_NAME)

pm2-stop:
    NODE_PORT=$(PORT) pm2 stop $(SERVICE_NAME)

pull:
	@echo ">>> Pull Code on Current branch [$(BRANCH)]"
	git pull origin $(BRANCH) --rebase

push: test
	@echo ">>> Current branch [$(BRANCH)] Pushing Code"
	git push origin $(BRANCH)

test:
	node --check $(ENDPOINT) && \
	node --check modules/async-db.js && \
	node --check modules/dcard.js
#	mocha

cp_conf: |
	mkdir /tmp/sql && mkdir /tmp/conf && \
	cp sql/init.sql /tmp/sql/ && \
	rm .env && \
	cp .envLocal .env

destroy:
	@echo ">>> Destroy Services ......(Containers)"
	docker-compose down --remove-orphans

# Migration
migrate:
	node node_modules/db-migrate/bin/db-migrate up

# CircleCI Env
migrate-ci:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e circleci

# Migration-Production
migrate-prod:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e prod

