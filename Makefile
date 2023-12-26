run:
	sudo docker compose up -d --build

stop:
	sudo docker compose down -v

migrate:
	sudo docker exec -it db psql -U postgres -a -f /var/initial.sql