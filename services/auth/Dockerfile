FROM rust:latest

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

COPY . .

EXPOSE 8080

ENV DB_URL postgresql://postgres:postgres@localhost:5432/app
ENV JWT_SECRET nsjzQNKWhBdrfBCDkjSzLD_CHolc2lERlUvmKhlAwzh_qGi-c8JFcYTNG-JCPAt0NoW83OxY_sCM3mJ9tGuXJA

CMD [ "cargo", "run" ]