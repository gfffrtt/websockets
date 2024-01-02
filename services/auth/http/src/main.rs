use std::env;

use sqlx::postgres::PgPoolOptions;

#[tokio::main]
async fn main() {
    let connection = env::var("DB_URL").unwrap();
    let db = PgPoolOptions::new()
        .max_connections(20)
        .connect(&connection)
        .await
        .unwrap();

    http::server::server(db).await
}
