run:
	cd app && make run && cd .. && cd /services/auth && make run 

stop:
	cd app && make down && cd .. && cd /services/auth && make down 

migrate:
	cd app && make migrate && cd .. && cd /services/auth && make migrate 
