from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import CurrentUser, RequireStudent
from app.models.student import Student
from app.schemas.student import (
    StudentProfileCreate,
    StudentProfileResponse,
    StudentProfileUpdate,
)
from app.services.student_service import student_service


router = APIRouter(
    prefix="/students",
    tags=["Students"],
)


@router.get(
    "/me",
    response_model=StudentProfileResponse,
    summary="Get My Student Profile",
)
async def get_my_profile(
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[Student, RequireStudent],
) -> StudentProfileResponse:
    profile = await student_service.get_profile(
        db,
        current_user.id,
    )

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student profile not found",
        )

    return StudentProfileResponse.model_validate(
        profile
    )


@router.post(
    "/me",
    response_model=StudentProfileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create My Student Profile",
)
async def create_my_profile(
    payload: StudentProfileCreate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[Student, RequireStudent],
) -> StudentProfileResponse:
    try:
        profile = await student_service.create_profile(
            db,
            current_user.id,
            payload,
        )

        profile_data = await student_service.get_profile(
            db,
            current_user.id,
        )

        if profile_data is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student profile not found",
            )

        return StudentProfileResponse.model_validate(
            profile_data
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.patch(
    "/me",
    response_model=StudentProfileResponse,
    summary="Update My Student Profile",
)
async def update_my_profile(
    payload: StudentProfileUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
    _: Annotated[Student, RequireStudent],
) -> StudentProfileResponse:
    try:
        await student_service.update_profile(
            db,
            current_user.id,
            payload,
        )

        profile_data = await student_service.get_profile(
            db,
            current_user.id,
        )

        if profile_data is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student profile not found",
            )

        return StudentProfileResponse.model_validate(
            profile_data
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc