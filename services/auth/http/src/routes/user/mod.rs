use app::user::User;
use axum::{
    extract::Request,
    http::StatusCode,
    response::IntoResponse,
    routing::{delete, get, post},
    Extension, Json, Router,
};
use axum_extra::extract::CookieJar;
use db::user::UserRepository;
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::{jwt::Jwt, responses::Responses};

pub fn router() -> Router {
    Router::new()
        .route("/signin", post(sign_in))
        .route("/signout", delete(sign_out))
        .route("/session", get(session))
}

#[derive(Deserialize, Serialize)]
pub struct Credentials {
    pub email: String,
    pub password: String,
}

pub async fn sign_in(
    db: Extension<PgPool>,
    Json(credentials): Json<Credentials>,
) -> Result<impl IntoResponse, StatusCode> {
    let Extension(db) = db;
    let user_repo = UserRepository::new(db);
    let user = user_repo.get_by_email(&credentials.email).await;
    match user {
        Some(user) => Responses::sign_in_response(user),
        None => {
            let user = user_repo
                .save(User::new(&credentials.email, &credentials.password))
                .await
                .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
                .unwrap();
            Responses::sign_in_response(user)
        }
    }
}

pub async fn session(request: Request) -> Result<impl IntoResponse, StatusCode> {
    let jar = CookieJar::from_headers(request.headers());
    let access_token = jar.get("access_token");

    match access_token {
        Some(cookie) => {
            let token = &cookie.value().to_string();
            let payload = Jwt::verify(token)
                .map_err(|_| return StatusCode::FORBIDDEN)
                .unwrap();
            Ok(Json(payload))
        }
        None => Err(StatusCode::FORBIDDEN),
    }
}

pub async fn sign_out() -> impl IntoResponse {
    Responses::sign_out_response()
}
