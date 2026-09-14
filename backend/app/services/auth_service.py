from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_refresh_subject,
    hash_password,
    verify_password,
)
from app.models.user import User, UserRole, UserStatus
from app.schemas.auth import (
    AuthResponse,
    LoginRequest,
    RefreshResponse,
    RegisterRequest,
    UserResponse,
)


class AuthService:
    # ========================================================
    # REGISTER
    # ========================================================

    async def register(
        self,
        db: AsyncSession,
        data: RegisterRequest,
    ) -> AuthResponse:

        existing_user = await db.scalar(
            select(User).where(
                User.email == data.email
            )
        )

        if existing_user is not None:
            raise ValueError(
                "An account with this email already exists"
            )

        # ----------------------------------------------------
        # Public signup must never create an administrator.
        # ----------------------------------------------------

        if data.role == UserRole.ADMIN:
            raise ValueError(
                "Administrator accounts cannot be created "
                "through public signup"
            )

        # ----------------------------------------------------
        # Teacher accounts require admin verification.
        # ----------------------------------------------------

        account_status = (
            UserStatus.PENDING
            if data.role == UserRole.TEACHER
            else UserStatus.ACTIVE
        )

        user = User(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            password_hash=hash_password(
                data.password
            ),
            role=data.role,
            status=account_status,
            is_email_verified=False,
            is_phone_verified=False,
        )

        db.add(user)

        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise

        await db.refresh(user)

        # ----------------------------------------------------
        # Create tokens
        # ----------------------------------------------------

        access_token = create_access_token(
            subject=str(user.id),
            role=user.role.value,
        )

        refresh_token = create_refresh_token(
            subject=str(user.id),
            role=user.role.value,
        )

        return AuthResponse(
            user=UserResponse.model_validate(user),
            access_token=access_token,
            refresh_token=refresh_token,
        )

    # ========================================================
    # LOGIN
    # ========================================================

    async def login(
        self,
        db: AsyncSession,
        data: LoginRequest,
    ) -> AuthResponse:

        user = await db.scalar(
            select(User).where(
                User.email == data.email
            )
        )

        if user is None:
            raise ValueError(
                "Invalid email or password"
            )

        if not verify_password(
            data.password,
            user.password_hash,
        ):
            raise ValueError(
                "Invalid email or password"
            )

        # ----------------------------------------------------
        # Account status checks
        # ----------------------------------------------------

        if user.status == UserStatus.SUSPENDED:
            raise ValueError(
                "This account has been suspended"
            )

        if user.status == UserStatus.INACTIVE:
            raise ValueError(
                "This account is inactive"
            )

        # ----------------------------------------------------
        # Update last login
        # ----------------------------------------------------

        user.last_login_at = datetime.now(
            timezone.utc
        )

        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise

        await db.refresh(user)

        # ----------------------------------------------------
        # Create tokens
        # ----------------------------------------------------

        access_token = create_access_token(
            subject=str(user.id),
            role=user.role.value,
        )

        refresh_token = create_refresh_token(
            subject=str(user.id),
            role=user.role.value,
        )

        return AuthResponse(
            user=UserResponse.model_validate(user),
            access_token=access_token,
            refresh_token=refresh_token,
        )

    # ========================================================
    # REFRESH TOKENS
    # ========================================================

    async def refresh_tokens(
        self,
        db: AsyncSession,
        refresh_token: str,
    ) -> RefreshResponse:

        try:
            user_id = get_refresh_subject(
                refresh_token
            )
        except ValueError as exc:
            raise ValueError(
                "Invalid or expired refresh token"
            ) from exc

        # ----------------------------------------------------
        # Convert token subject to integer
        # ----------------------------------------------------

        try:
            user_id_int = int(user_id)
        except (TypeError, ValueError) as exc:
            raise ValueError(
                "Invalid token subject"
            ) from exc

        # ----------------------------------------------------
        # Load user
        # ----------------------------------------------------

        user = await db.get(
            User,
            user_id_int,
        )

        if user is None:
            raise ValueError(
                "User account was not found"
            )

        # ----------------------------------------------------
        # Validate account status
        # ----------------------------------------------------

        if user.status in {
            UserStatus.SUSPENDED,
            UserStatus.INACTIVE,
        }:
            raise ValueError(
                "This account cannot use this session"
            )

        # ----------------------------------------------------
        # Rotate tokens
        # ----------------------------------------------------

        access_token = create_access_token(
            subject=str(user.id),
            role=user.role.value,
        )

        new_refresh_token = create_refresh_token(
            subject=str(user.id),
            role=user.role.value,
        )

        return RefreshResponse(
            access_token=access_token,
            refresh_token=new_refresh_token,
        )

    # ========================================================
    # GET USER BY ID
    # ========================================================

    async def get_user_by_id(
        self,
        db: AsyncSession,
        user_id: int,
    ) -> User | None:

        user = await db.get(
            User,
            user_id,
        )

        return user


# ============================================================
# SERVICE INSTANCE
# ============================================================

auth_service = AuthService()