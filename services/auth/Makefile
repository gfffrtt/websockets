run:
	sudo docker compose up --build -d

stop:
	sudo docker compose down -v

ps:
	sudo docker compose ps

migrate:
	sudo docker cp /db/migrations/initial.sql && docker exec -it psql -U postgres -d app -f -a /scripts/initial.sql