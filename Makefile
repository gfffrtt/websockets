run:
	cd app && make run && cd .. && cd ./services/auth && make run 

stop:
	cd app && make stop && cd .. && cd ./services/auth && make stop 

migrate:
	cd app && make migrate && cd .. && cd ./services/auth && make migrate 
