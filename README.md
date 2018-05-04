# ExpressWebserver
Node webserver with Express

## Docker commands
* docker pull mongo
* docker run --rm --name mongodb -v ExpressWebServer:/data/db -d -p 27017:27017 mongo
* docker run --rm --name mongodb -v D:/_James\MyCode/ExpressWebserver/data:/data/db -it -p 27017:27017 mongo

### Create Admin user
* docker exec -it mongodb mongo admin
* db.createUser({ user: 'james', pwd: '42', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

### Insert Data
* docker exec -it mongodb mongo admin
* 