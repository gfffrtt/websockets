use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method,
    },
    Extension, Router,
};
use sqlx::PgPool;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::routes::user;

pub fn app(db: PgPool) -> Router {
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::OPTIONS, Method::POST, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    Router::new()
        .merge(user::router())
        .layer(Extension(db))
        .layer(cors)
}

pub async fn server(db: PgPool) {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();

    axum::serve(listener, app(db).into_make_service())
        .await
        .unwrap()
}
