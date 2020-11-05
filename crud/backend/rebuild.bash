docker-compose down

docker-compose up -d

sleep(5)

npx knex migrate:latest

sleep(5)

node populate.js