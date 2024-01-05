use app::message::Message;
use sqlx::PgPool;

pub struct MessagesRepository {
    pub db: PgPool,
}

impl MessagesRepository {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }

    pub async fn save(&self, message: Message) -> Result<(), Box<dyn std::error::Error>> {
        let sql = r#"insert into "messages" (id, content, group_id, author_id, created_at) values ($1, $2, $3, $4, $5)"#;
        let message = sqlx::query_as::<_, Message>(sql)
            .bind(message.id)
            .bind(message.content)
            .bind(message.group_id)
            .bind(message.author_id)
            .bind(message.created_at)
            .fetch_one(&self.db)
            .await;
        match message {
            Ok(_) => Ok(()),
            Err(err) => Err(Box::new(err)),
        }
    }
}
