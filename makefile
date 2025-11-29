SHELL := /bin/bash
COMPOSE ?= docker compose
PRISMA ?= bunx prisma --config ./prisma.config.ts
DB_SERVICE ?= db

.PHONY: migrate generate reset seed dev db-up db-down db-clean db-logs

db-up:
	@$(COMPOSE) up -d $(DB_SERVICE)

db-down:
	@$(COMPOSE) stop $(DB_SERVICE)

db-clean:
	@$(COMPOSE) down -v

db-logs:
	@$(COMPOSE) logs -f $(DB_SERVICE)

migrate: db-up
	@$(PRISMA) migrate dev

generate:
	@$(PRISMA) generate

reset: db-up
	@$(PRISMA) migrate reset

seed: db-up
	@$(PRISMA) db seed

dev: db-up
	@bun dev
