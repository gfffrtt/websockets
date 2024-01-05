FROM rust:latest

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

COPY . .

EXPOSE 8080

ENV DB_URL postgresql://postgres:postgres@localhost:5434/app

CMD [ "cargo", "run" ]