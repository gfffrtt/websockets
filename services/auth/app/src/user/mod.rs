use bcrypt::hash;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Deserialize, Serialize, FromRow)]
pub struct User {
    pub id: uuid::Uuid,
    pub email: String,
    pub password: String,
}

pub enum Verify {
    IncorrectPassword,
    IncorrectEmail,
    Verified,
}

impl User {
    pub fn new(email: &String, password: &String) -> Self {
        Self {
            id: uuid::Uuid::new_v4(),
            email: email.to_string(),
            password: hash(password, 10).unwrap(),
        }
    }

    pub fn verify(&self, email: &str, password: &str) -> Verify {
        if self.email != email {
            return Verify::IncorrectEmail;
        }

        if bcrypt::verify(password, self.password.as_str()).is_err() {
            return Verify::IncorrectPassword;
        }

        Verify::Verified
    }
}
