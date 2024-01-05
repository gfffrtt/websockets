create table if not exists "message" (
    "id" TEXT PRIMARY KEY unique,
    "content" TEXT,
    "group_id" TEXT,
    "author_id" TEXT,
    "created_at" INT
);
