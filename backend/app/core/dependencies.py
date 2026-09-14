from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_token
from app.models.user import User, UserRole, UserStatus
from app.services.auth_service import auth_service


# ============================================================
# HTTP BEARER AUTHENTICATION
# ============================================================

bearer_scheme = HTTPBearer(auto_error=True)


# ============================================================
# CURRENT USER
# ============================================================

async def get_current_user(
    credentials: Annotated[
        HTTPAuthorizationCredentials,
        Depends(bearer_scheme),
    ],
    db: Annotated[
        AsyncSession,
        Depends(get_db),
    ],
) -> User:
    """
    Authenticate the request using the JWT access token
    and return the current database user.
    """

    token = credentials.credentials

    # --------------------------------------------------------
    # Decode JWT
    # --------------------------------------------------------

    try:
        payload = decode_token(token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        ) from exc

    # --------------------------------------------------------
    # Validate token type
    # --------------------------------------------------------

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # --------------------------------------------------------
    # Get subject
    # --------------------------------------------------------

    subject = payload.get("sub")

    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token subject is missing",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # --------------------------------------------------------
    # Convert subject to user ID
    # --------------------------------------------------------

    try:
        user_id = int(subject)
    except (TypeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token subject",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        ) from exc

    # --------------------------------------------------------
    # Load user from database
    # --------------------------------------------------------

    user = await auth_service.get_user_by_id(
        db,
        user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # --------------------------------------------------------
    # Check account status
    # --------------------------------------------------------

    if user.status in {
        UserStatus.INACTIVE,
        UserStatus.SUSPENDED,
    }:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is not active",
        )

    return user


# ============================================================
# CURRENT USER DEPENDENCY
# ============================================================

CurrentUser = Annotated[
    User,
    Depends(get_current_user),
]


# ============================================================
# ROLE-BASED ACCESS CONTROL
# ============================================================

def require_roles(
    *allowed_roles: UserRole,
):
    """
    Create a dependency that allows only specific user roles.
    """

    async def role_checker(
        current_user: CurrentUser,
    ) -> User:

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "You do not have permission "
                    "to access this resource"
                ),
            )

        return current_user

    return role_checker


# ============================================================
# ROLE DEPENDENCIES
# ============================================================

RequireStudent = Depends(
    require_roles(UserRole.STUDENT)
)

RequireTeacher = Depends(
    require_roles(UserRole.TEACHER)
)

RequireParent = Depends(
    require_roles(UserRole.PARENT)
)

RequireAdmin = Depends(
    require_roles(UserRole.ADMIN)
)


# ============================================================
# DATABASE SESSION COMPATIBILITY
# ============================================================

async def get_db_session() -> AsyncGenerator[
    AsyncSession,
    None,
]:
    """
    Compatibility dependency for APIs that prefer
    an explicit database-session dependency name.
    """

    async for session in get_db():
        yield session