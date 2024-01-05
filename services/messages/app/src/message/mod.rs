use chrono::Utc;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Deserialize, Serialize, FromRow)]
pub struct Message {
    pub id: uuid::Uuid,
    pub content: String,
    pub group_id: uuid::Uuid,
    pub author_id: uuid::Uuid,
    pub created_at: i64,
}

impl Message {
    pub fn new(content: String, group_id: uuid::Uuid, author_id: uuid::Uuid) -> Self {
        Self {
            id: uuid::Uuid::new_v4(),
            content,
            group_id,
            author_id,
            created_at: Utc::now().timestamp(),
        }
    }
}
