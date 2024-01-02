use app::user::User;
use sqlx::PgPool;

pub struct UserRepository {
    db: PgPool,
}

pub enum UserRepositoryErrors {
    CouldntSaveUser,
    UserNotFound,
}

impl UserRepository {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }

    pub async fn save(&self, user: User) -> Result<User, UserRepositoryErrors> {
        let sql = r#"insert into "user" (id, email, password) values ($1, $2, $3)"#;
        let user = sqlx::query_as::<_, User>(sql)
            .bind(user.id)
            .bind(user.email)
            .bind(user.password)
            .fetch_one(&self.db)
            .await;

        match user {
            Ok(user) => Ok(user),
            Err(_) => Err(UserRepositoryErrors::CouldntSaveUser),
        }
    }

    pub async fn get_by_email(&self, email: &str) -> Option<User> {
        let sql = r#"select * from "user" where email = $1"#;
        sqlx::query_as::<_, User>(sql)
            .bind(email)
            .fetch_optional(&self.db)
            .await
            .unwrap()
    }
}
