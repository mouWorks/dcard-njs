#!/usr/bin/make -f
BRANCH := $(shell git name-rev --name-only HEAD)
ENDPOINT := server.js
SERVICE_NAME := dcard
PORT := 3003
CONFIG := ecosystem.config.js

.PHONY: test

build:
	@echo ">>> Builing packages"
	npm install

# html-pack:
# 	@echo ">>> Generate Static Html"
# 	pug views/pug --out static/html

restart: stop start
	@echo ">>> Restart NodeJS Service by PM2"

# We use reload instead
reload:
	@echo ">>> Reload PM2 Service"
	pm2 reload $(CONFIG)

stop:
	@echo ">>> Stopping Server"
	NODE_PORT=$(PORT) pm2 stop $(ENDPOINT)

start:
	@echo ">>> Starting Server"
	NODE_PORT=$(PORT) pm2 start $(ENDPOINT) --name $(SERVICE_NAME)

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
	node --check $(ENDPOINT) &&
	node --check modules/async-db.js &&
	node --check modules/dcard.js &&
	mocha

# Migration
migrate:
	node node_modules/db-migrate/bin/db-migrate up

# CircleCI Env
migrate-ci:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e circleci

# Migration-Production
migrate-prod:
	node node_modules/db-migrate/bin/db-migrate up --config database.json -e prod


