use axum::{
    http::{header, HeaderMap, Response, StatusCode},
    response::IntoResponse,
};
use axum_extra::extract::cookie::{Cookie, SameSite};
use serde_json::json;
use time::Duration;

use crate::jwt::Jwt;
use app::user::User;

pub struct Responses {}

impl Responses {
    pub fn sign_in_response(user: User) -> Result<impl IntoResponse, StatusCode> {
        let access_token = Jwt::sign(user.id, user.email)
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
            .unwrap();

        let access_token = Cookie::build(("access_token", access_token))
            .path("/")
            .same_site(SameSite::None)
            .http_only(true);
        let mut headers = HeaderMap::new();
        headers.append(
            header::SET_COOKIE,
            access_token.to_string().parse().unwrap(),
        );
        let mut response = Response::new(json!({"message": "SUCCESS"}).to_string());
        response.headers_mut().extend(headers);
        Ok(response)
    }

    pub fn sign_out_response() -> impl IntoResponse {
        let access_token = Cookie::build(("access_token", ""))
            .path("/")
            .max_age(Duration::seconds(-1))
            .same_site(SameSite::None)
            .http_only(true);
        let mut headers = HeaderMap::new();
        headers.append(
            header::SET_COOKIE,
            access_token.to_string().parse().unwrap(),
        );
        let mut response = Response::new(json!({"message": "SUCCESS"}).to_string());
        response.headers_mut().extend(headers);
        response
    }
}
