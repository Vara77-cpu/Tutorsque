from datetime import datetime, timedelta, timezone
from typing import Any

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError
from jose import JWTError, jwt

from app.core.config import settings


# ============================================================
# PASSWORD HASHING
# ============================================================

password_hasher = PasswordHasher()


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using Argon2id.
    """
    return password_hasher.hash(password)


def verify_password(
    password: str,
    password_hash: str,
) -> bool:
    """
    Verify a plain-text password against an Argon2 hash.
    """
    try:
        return password_hasher.verify(
            password_hash,
            password,
        )
    except (VerifyMismatchError, VerificationError):
        return False


# ============================================================
# JWT TOKEN CREATION
# ============================================================

def _create_token(
    subject: str,
    role: str,
    token_type: str,
    expires_delta: timedelta,
) -> str:
    """
    Create a signed JWT token.
    """

    now = datetime.now(timezone.utc)
    expires_at = now + expires_delta

    payload: dict[str, Any] = {
        "sub": subject,
        "role": role,
        "type": token_type,
        "iat": now,
        "exp": expires_at,
    }

    return jwt.encode(
        payload,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


# ============================================================
# ACCESS TOKEN
# ============================================================

def create_access_token(
    subject: str,
    role: str,
) -> str:
    """
    Create a short-lived access token.
    """

    return _create_token(
        subject=subject,
        role=role,
        token_type="access",
        expires_delta=timedelta(
            minutes=settings.access_token_expire_minutes
        ),
    )


# ============================================================
# REFRESH TOKEN
# ============================================================

def create_refresh_token(
    subject: str,
    role: str,
) -> str:
    """
    Create a long-lived refresh token.
    """

    return _create_token(
        subject=subject,
        role=role,
        token_type="refresh",
        expires_delta=timedelta(
            days=settings.refresh_token_expire_days
        ),
    )


# ============================================================
# TOKEN DECODING
# ============================================================

def decode_token(token: str) -> dict[str, Any]:
    """
    Decode and validate a JWT token.
    """

    try:
        return jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError as exc:
        raise ValueError(
            "Invalid or expired token"
        ) from exc


# ============================================================
# ACCESS TOKEN SUBJECT
# ============================================================

def get_token_subject(token: str) -> str:
    """
    Extract the user ID from an access token.
    """

    payload = decode_token(token)

    if payload.get("type") != "access":
        raise ValueError("Invalid access token")

    subject = payload.get("sub")

    if subject is None:
        raise ValueError("Token subject is missing")

    return str(subject)


# ============================================================
# REFRESH TOKEN SUBJECT
# ============================================================

def get_refresh_subject(token: str) -> str:
    """
    Extract the user ID from a refresh token.
    """

    payload = decode_token(token)

    if payload.get("type") != "refresh":
        raise ValueError("Invalid refresh token")

    subject = payload.get("sub")

    if subject is None:
        raise ValueError("Token subject is missing")

    return str(subject)


# ============================================================
# ACCESS TOKEN ROLE
# ============================================================

def get_token_role(token: str) -> str:
    """
    Extract the user's role from an access token.
    """

    payload = decode_token(token)

    if payload.get("type") != "access":
        raise ValueError("Invalid access token")

    role = payload.get("role")

    if not role:
        raise ValueError("Token role is missing")

    return str(role)