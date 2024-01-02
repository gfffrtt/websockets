use std::env;

use jsonwebtoken::{
    decode, encode, get_current_timestamp, Algorithm, DecodingKey, EncodingKey, Header, Validation,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct JwtPayload {
    pub sub: uuid::Uuid,
    pub email: String,
    pub exp: u64,
}

impl JwtPayload {
    pub fn new(id: uuid::Uuid, email: String) -> Self {
        Self {
            sub: id,
            email,
            exp: get_current_timestamp() * 2,
        }
    }
}

pub struct Jwt {}

pub enum JwtErrors {
    InvalidJwt,
    ErrorGeneratingJwt,
}

impl Jwt {
    pub fn sign(user_id: uuid::Uuid, email: String) -> Result<String, JwtErrors> {
        let claims = JwtPayload::new(user_id, email);
        let encryption = Header::new(Algorithm::HS512);
        let token = encode(
            &encryption,
            &claims,
            &EncodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_bytes()),
        );
        match token {
            Ok(token) => Ok(token),
            Err(_) => Err(JwtErrors::ErrorGeneratingJwt),
        }
    }

    pub fn verify(token: &String) -> Result<JwtPayload, JwtErrors> {
        let encryption = Validation::new(Algorithm::HS512);
        let token = decode::<JwtPayload>(
            &token,
            &DecodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_bytes()),
            &encryption,
        );
        match token {
            Ok(token) => Ok(token.claims),
            Err(err) => {
                println!("{}", err.to_string());
                Err(JwtErrors::ErrorGeneratingJwt)
            }
        }
    }
}
