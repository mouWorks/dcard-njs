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

docker-start:
	docker-compose up -d --no-recreate
	@echo ">>> Start: Visit http://localhost:3003 ...."

# For Ubuntu Server
docker-stop:
	@echo ">>> Stop container......"
	docker-compose stop && rm -r /tmp/default.conf

# Use this for local
start: docker-start
	@echo ">>> Starting Server"
	NODE_PORT=$(PORT) pm2 start $(ENDPOINT) --name $(SERVICE_NAME)

stop: docker-stop
	@echo ">>> Stopping Server"
	NODE_PORT=$(PORT) pm2 stop $(SERVICE_NAME)

local:
	@echo ">>> Running Local env"
	nodemon $(ENDPOINT)

pull:
	@echo ">>> Pull Code on Current branch [$(BRANCH)]"
	git pull origin $(BRANCH) --rebase

push: test
	@echo ">>> Current branch [$(BRANCH)] Pushing Code"
	git push origin $(BRANCH)

test:
	node --check $(ENDPOINT) && \
	node --check modules/async-db.js && \
	node --check modules/dcard.js && \
	mocha

cp_conf: |
	cp _conf/my.cnf /tmp

destroy:
	@echo ">>> Destroy Services ......(Containers)"
	docker-compose down --remove-orphans
cleanup: destroy
	@echo ">>> Destroy Services ......(Images)"
	docker-compose down --rmi 'all'

# Migration
migrate:
	node node_modules/db-migrate/bin/db-migrate up

# CircleCI Env
migrate-ci:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e circleci

# Migration-Production
migrate-prod:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e prod

