run:
	sudo docker compose up --build -d

stop:
	sudo docker compose down -v

ps:
	sudo docker compose ps

migrate:
	sudo docker cp ./db/migrations/initial.sql messages-db:./ && sudo docker exec -it messages-db psql -U postgres -d app -a -f ./initial.sql