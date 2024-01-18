FROM node:20.11.0

WORKDIR /app

COPY . .

RUN npm install

ARG DB_URL

RUN echo "DB_URL=${DB_URL}" > .env

EXPOSE 80

CMD ["node", "server"]