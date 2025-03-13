FROM node:latest

USER root

EXPOSE 3000

WORKDIR /app

COPY . .

CMD [ "node", "server/index" ]
