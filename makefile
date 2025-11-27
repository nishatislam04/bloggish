# create basic prisma commands
migrate: 
	@bunx prisma migrate dev

generate:
	@bunx prisma generate

reset: 
	@bunx prisma migrate reset

seed:
	@bunx prisma db seed

dev: 
	@bun dev
