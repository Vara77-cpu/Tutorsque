from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.user import UserRole


# ============================================================
# REGISTER
# ============================================================

class RegisterRequest(BaseModel):
    full_name: str = Field(
        min_length=2,
        max_length=150,
    )

    email: str = Field(
        min_length=5,
        max_length=255,
    )

    phone: str | None = Field(
        default=None,
        max_length=30,
    )

    password: str = Field(
        min_length=8,
        max_length=128,
    )

    role: UserRole = UserRole.STUDENT

    @field_validator("full_name")
    @classmethod
    def validate_full_name(
        cls,
        value: str,
    ) -> str:
        value = value.strip()

        if len(value) < 2:
            raise ValueError(
                "Full name is required"
            )

        return value

    @field_validator("email")
    @classmethod
    def validate_email(
        cls,
        value: str,
    ) -> str:
        value = value.strip().lower()

        if "@" not in value:
            raise ValueError(
                "Enter a valid email address"
            )

        local_part, domain = value.split(
            "@",
            1,
        )

        if not local_part or "." not in domain:
            raise ValueError(
                "Enter a valid email address"
            )

        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return None

        value = value.strip()

        return value if value else None

    @field_validator("password")
    @classmethod
    def validate_password(
        cls,
        value: str,
    ) -> str:

        if len(value) < 8:
            raise ValueError(
                "Password must contain at least 8 characters"
            )

        if not any(
            char.isupper()
            for char in value
        ):
            raise ValueError(
                "Password must contain at least one uppercase letter"
            )

        if not any(
            char.islower()
            for char in value
        ):
            raise ValueError(
                "Password must contain at least one lowercase letter"
            )

        if not any(
            char.isdigit()
            for char in value
        ):
            raise ValueError(
                "Password must contain at least one number"
            )

        return value


# ============================================================
# LOGIN
# ============================================================

class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def normalize_email(
        cls,
        value: str,
    ) -> str:
        return value.strip().lower()


# ============================================================
# REFRESH TOKEN
# ============================================================

class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(
        min_length=20,
    )


# ============================================================
# USER RESPONSE
# ============================================================

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str | None
    role: UserRole
    status: str
    is_email_verified: bool
    is_phone_verified: bool

    model_config = ConfigDict(
        from_attributes=True,
    )


# ============================================================
# AUTH RESPONSE
# ============================================================

class AuthResponse(BaseModel):
    user: UserResponse

    access_token: str
    refresh_token: str

    token_type: str = "bearer"


# ============================================================
# REFRESH RESPONSE
# ============================================================

class RefreshResponse(BaseModel):
    access_token: str
    refresh_token: str

    token_type: str = "bearer"