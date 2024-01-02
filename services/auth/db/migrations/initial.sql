create table if not exists "user" (
    "id" TEXT PRIMARY KEY unique,
    "email" VARCHAR(200) UNIQUE,
    "password" TEXT
);
