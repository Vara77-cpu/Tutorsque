from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ============================================================
    # APPLICATION
    # ============================================================

    app_name: str = "TutorsQue API"
    app_version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True

    # ============================================================
    # DATABASE
    # ============================================================

    database_url: str = Field(
        default=(
            "postgresql+asyncpg://"
            "postgres:postgres@localhost:5433/tutorsque"
        )
    )

    # ============================================================
    # REDIS
    # ============================================================

    redis_url: str = Field(
        default="redis://localhost:6379/0"
    )

    # ============================================================
    # JWT AUTHENTICATION
    # ============================================================

    jwt_secret_key: str = Field(
        default="change-this-in-production"
    )

    jwt_algorithm: str = "HS256"

    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 30

    # ============================================================
    # FRONTEND
    # ============================================================

    frontend_url: str = "http://localhost:3000"

    # ============================================================
    # CORS
    # ============================================================

    cors_origins: str = (
        "http://localhost:3000,"
        "http://127.0.0.1:3000"
    )

    @property
    def cors_origins_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

    # ============================================================
    # RAZORPAY
    # ============================================================

    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""

    # ============================================================
    # LIVEKIT
    # ============================================================

    livekit_url: str = ""
    livekit_api_key: str = ""
    livekit_api_secret: str = ""

    # ============================================================
    # OBJECT STORAGE
    # ============================================================

    storage_endpoint: str = ""
    storage_access_key: str = ""
    storage_secret_key: str = ""
    storage_bucket: str = ""

    # ============================================================
    # PYDANTIC SETTINGS
    # ============================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


# ================================================================
# SETTINGS SINGLETON
# ================================================================

@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()