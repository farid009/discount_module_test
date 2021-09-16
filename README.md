1. edit .env.example and rename it to .env for set your environment variables
2. edit .postgres.env and rename it to .postgres.env for set your postgres environment variables
3. setup postgres with docker-compose -f stack-docker-compose.yml up -d
4. ssh to postgres container and create database with name you set in .env file
5. build project: docker-compose build
6. run project: docker-compose up -d
7. reset and seed database: ssh to container with ""docker exec -ti {container_id} bash"" -> yarn prisma migrate reset
8. access swagger api doc at localhost:{your_http_port}/doc
