# ExpressWebserver
Node webserver with ExpressJS and MongoDb

## Docker commands
* docker pull mongo
* docker volume create bookData
* docker run --rm --name mongodb -v bookData:/data/db -d -p 27017:27017 mongo

### Create Admin user
* docker exec -it mongodb mongo admin
* db.createUser({ user: 'james', pwd: '42', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

### Insert Data
* docker exec -it mongodb mongo admin