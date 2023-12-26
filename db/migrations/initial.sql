CREATE TABLE IF NOT EXISTS message (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT
);

INSERT INTO message (content) VALUES ('Hello from websocket service!');
INSERT INTO message (content) VALUES ('U suck');
INSERT INTO message (content) VALUES ('Rust is feeling good!');
