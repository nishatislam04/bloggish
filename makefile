SHELL := /bin/bash
COMPOSE ?= docker compose
PRISMA ?= bunx prisma --config ./prisma.config.ts
DB_SERVICES ?= db studio

.PHONY: migrate generate reset seed dev db-up db-down db-clean db-logs auth-migrate

db-up:
	@$(COMPOSE) up -d $(DB_SERVICES)

db-down:
	@$(COMPOSE) stop $(DB_SERVICES)

db-clean:
	@$(COMPOSE) down -v

db-logs:
	@$(COMPOSE) logs -f $(DB_SERVICES)

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

# auth-migrate: db-up
# 	@$(PRISMA) migrate dev --name auth

# auth-generate:
# 	@bunx @better-auth/cli generate
