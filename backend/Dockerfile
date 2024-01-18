FROM node:20.11.0

WORKDIR /app

COPY . .

RUN npm install

ARG DB_URL
ENV DB_URL=${DB_URL}

EXPOSE 80

CMD ["node", "server"]