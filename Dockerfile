FROM rust:latest

WORKDIR /app

COPY . .

EXPOSE 8080

CMD ["cargo", "run"]
