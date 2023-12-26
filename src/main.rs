use std::env;

use axum::{
    extract::{
        ws::{Message, WebSocket},
        WebSocketUpgrade,
    },
    response::IntoResponse,
    routing::get,
    Extension, Router,
};
use serde::Deserialize;
use sqlx::{postgres::PgPoolOptions, PgPool};
use tokio::net::TcpListener;

#[derive(Deserialize, sqlx::FromRow)]
struct MessageDb {
    id: uuid::Uuid,
    content: String,
}

async fn handle_socket(mut socket: WebSocket, messages: Vec<MessageDb>) {
    tokio::spawn(async move {
        for message in messages {
            socket
                .send(Message::Text(
                    format!("#{} -> {}", message.id, message.content).to_string(),
                ))
                .await
                .unwrap();
        }
    });
}

async fn ws_handler(db: Extension<PgPool>, ws: WebSocketUpgrade) -> impl IntoResponse {
    let messages = sqlx::query_as::<_, MessageDb>("select * from message")
        .fetch_all(&*db)
        .await
        .unwrap();

    ws.on_upgrade(move |socket| handle_socket(socket, messages))
}

#[tokio::main]
async fn main() {
    let db_url = env::var("DATABASE_URL").unwrap();
    let db = PgPoolOptions::new()
        .max_connections(20)
        .connect(&db_url)
        .await
        .unwrap();

    let router = Router::new()
        .route("/ws", get(ws_handler))
        .layer(Extension(db));

    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    axum::serve(listener, router.into_make_service())
        .await
        .unwrap();
}
