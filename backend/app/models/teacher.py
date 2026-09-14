from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import RequireTeacher
from app.models.teacher import Teacher


router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"],
)


# ============================================================
# GET CURRENT TEACHER PROFILE
# ============================================================

@router.get("/me")
async def get_my_teacher_profile(
    current_user=RequireTeacher,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Teacher).where(
            Teacher.user_id == current_user.id
        )
    )

    teacher = result.scalar_one_or_none()

    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )

    return {
        "id": teacher.id,
        "user_id": teacher.user_id,
        "school_id": teacher.school_id,
        "qualification": teacher.qualification,
        "experience_years": teacher.experience_years,
        "specialization": teacher.specialization,
        "bio": teacher.bio,
        "date_of_birth": teacher.date_of_birth,
        "verification_status": teacher.verification_status.value,
        "document_url": teacher.document_url,
        "is_available": teacher.is_available,
        "created_at": teacher.created_at,
        "updated_at": teacher.updated_at,
    }


# ============================================================
# UPDATE CURRENT TEACHER PROFILE
# ============================================================

@router.patch("/me")
async def update_my_teacher_profile(
    payload: dict,
    current_user=RequireTeacher,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Teacher).where(
            Teacher.user_id == current_user.id
        )
    )

    teacher = result.scalar_one_or_none()

    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )

    allowed_fields = {
        "qualification",
        "experience_years",
        "specialization",
        "bio",
        "date_of_birth",
        "document_url",
        "is_available",
    }

    for field, value in payload.items():
        if field not in allowed_fields:
            continue

        if not hasattr(teacher, field):
            continue

        setattr(teacher, field, value)

    await db.commit()
    await db.refresh(teacher)

    return {
        "message": "Teacher profile updated successfully",
        "teacher": {
            "id": teacher.id,
            "user_id": teacher.user_id,
            "school_id": teacher.school_id,
            "qualification": teacher.qualification,
            "experience_years": teacher.experience_years,
            "specialization": teacher.specialization,
            "bio": teacher.bio,
            "date_of_birth": teacher.date_of_birth,
            "verification_status": teacher.verification_status.value,
            "document_url": teacher.document_url,
            "is_available": teacher.is_available,
            "created_at": teacher.created_at,
            "updated_at": teacher.updated_at,
        },
    }


# ============================================================
# TEACHER AVAILABILITY
# ============================================================

@router.patch("/me/availability")
async def update_teacher_availability(
    is_available: bool,
    current_user=RequireTeacher,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Teacher).where(
            Teacher.user_id == current_user.id
        )
    )

    teacher = result.scalar_one_or_none()

    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )

    teacher.is_available = is_available

    await db.commit()
    await db.refresh(teacher)

    return {
        "message": "Teacher availability updated successfully",
        "is_available": teacher.is_available,
    }


# ============================================================
# TEACHER VERIFICATION STATUS
# ============================================================

@router.get("/me/verification")
async def get_teacher_verification_status(
    current_user=RequireTeacher,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Teacher).where(
            Teacher.user_id == current_user.id
        )
    )

    teacher = result.scalar_one_or_none()

    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )

    return {
        "teacher_id": teacher.id,
        "verification_status": teacher.verification_status.value,
        "document_url": teacher.document_url,
    }


# ============================================================
# TEACHER PROFILE COMPLETION
# ============================================================

@router.get("/me/completion")
async def get_teacher_profile_completion(
    current_user=RequireTeacher,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Teacher).where(
            Teacher.user_id == current_user.id
        )
    )

    teacher = result.scalar_one_or_none()

    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )

    fields = [
        teacher.qualification,
        teacher.experience_years > 0,
        teacher.specialization,
        teacher.bio,
        teacher.date_of_birth,
        teacher.document_url,
        teacher.school_id,
    ]

    completed = sum(
        1 for field in fields
        if field not in (None, "", False)
    )

    total = len(fields)

    percentage = round(
        (completed / total) * 100
    )

    return {
        "completed_fields": completed,
        "total_fields": total,
        "percentage": percentage,
    }