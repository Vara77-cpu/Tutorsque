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


# ─────────────────────────────────────────────
# CURRENT TEACHER PROFILE
# ─────────────────────────────────────────────

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
        "school_id": getattr(teacher, "school_id", None),
        "qualification": getattr(teacher, "qualification", None),
        "experience_years": getattr(teacher, "experience_years", None),
        "bio": getattr(teacher, "bio", None),
        "status": getattr(teacher, "status", None),
        "created_at": teacher.created_at,
        "updated_at": teacher.updated_at,
    }


# ─────────────────────────────────────────────
# TEACHER PROFILE UPDATE
# ─────────────────────────────────────────────

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
        "bio",
    }

    for field, value in payload.items():
        if field in allowed_fields and hasattr(teacher, field):
            setattr(teacher, field, value)

    await db.commit()
    await db.refresh(teacher)

    return {
        "message": "Teacher profile updated successfully",
        "teacher": {
            "id": teacher.id,
            "user_id": teacher.user_id,
            "qualification": getattr(
                teacher,
                "qualification",
                None,
            ),
            "experience_years": getattr(
                teacher,
                "experience_years",
                None,
            ),
            "bio": getattr(
                teacher,
                "bio",
                None,
            ),
            "status": getattr(
                teacher,
                "status",
                None,
            ),
        },
    }


# ─────────────────────────────────────────────
# TEACHER STATUS
# ─────────────────────────────────────────────

@router.get("/me/status")
async def get_teacher_status(
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
            status_code=404,
            detail="Teacher profile not found",
        )

    return {
        "teacher_id": teacher.id,
        "status": getattr(
            teacher,
            "status",
            None,
        ),
    }