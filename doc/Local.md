### How to Run Local

#### Note:

* This uses `docker`, `docker-compose` 
* Create 2 local docker image
    * `dcard_demo_mysql`
    * `dcard_demo_redis`
    
* MySQL will create 1 DB : `mouWorks`
* Also, `Makefile` support is required 

#### Steps

1. `npm run build` ->  build docker environment, npm install
    * same as `make build`
2. `npm run start` -> start the docker-compose service
3. `PLEASE WAIT 10 Secs` for DB to init
4. `make migrate` -> run the migration to create table locally
5. Visit `localhost:3003/demo` ->  should see the MySQL result.
6. CLEAN up: `npm run stop` 
    * same as `make stop`