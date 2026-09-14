from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.academic import (
    AcademicYear,
    Board,
    Course,
    Medium,
    Subject,
    Syllabus,
)


router = APIRouter(
    prefix="/academic",
    tags=["Academic"],
)


# ============================================================
# BOARDS
# ============================================================

@router.get("/boards")
async def get_boards(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Board)
        .where(Board.is_active.is_(True))
        .order_by(Board.name)
    )

    boards = result.scalars().all()

    return [
        {
            "id": board.id,
            "name": board.name,
            "code": board.code,
            "is_active": board.is_active,
        }
        for board in boards
    ]


@router.get("/boards/{board_id}")
async def get_board(
    board_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Board).where(Board.id == board_id)
    )

    board = result.scalar_one_or_none()

    if not board:
        raise HTTPException(
            status_code=404,
            detail="Board not found",
        )

    return {
        "id": board.id,
        "name": board.name,
        "code": board.code,
        "is_active": board.is_active,
    }


# ============================================================
# ACADEMIC YEARS
# ============================================================

@router.get("/academic-years")
async def get_academic_years(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(AcademicYear)
        .order_by(
            AcademicYear.start_year.desc()
        )
    )

    academic_years = result.scalars().all()

    return [
        {
            "id": year.id,
            "name": year.name,
            "start_year": year.start_year,
            "end_year": year.end_year,
            "is_current": year.is_current,
        }
        for year in academic_years
    ]


@router.get("/academic-years/current")
async def get_current_academic_year(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(AcademicYear).where(
            AcademicYear.is_current.is_(True)
        )
    )

    year = result.scalar_one_or_none()

    if not year:
        raise HTTPException(
            status_code=404,
            detail="Current academic year not found",
        )

    return {
        "id": year.id,
        "name": year.name,
        "start_year": year.start_year,
        "end_year": year.end_year,
        "is_current": year.is_current,
    }


# ============================================================
# MEDIUMS
# ============================================================

@router.get("/mediums")
async def get_mediums(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Medium)
        .order_by(Medium.name)
    )

    mediums = result.scalars().all()

    return [
        {
            "id": medium.id,
            "name": medium.name,
            "code": medium.code,
        }
        for medium in mediums
    ]


@router.get("/mediums/{medium_id}")
async def get_medium(
    medium_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Medium).where(
            Medium.id == medium_id
        )
    )

    medium = result.scalar_one_or_none()

    if not medium:
        raise HTTPException(
            status_code=404,
            detail="Medium not found",
        )

    return {
        "id": medium.id,
        "name": medium.name,
        "code": medium.code,
    }


# ============================================================
# SUBJECTS
# ============================================================

@router.get("/subjects")
async def get_subjects(
    active_only: bool = True,
    db: AsyncSession = Depends(get_db),
):
    query = select(Subject)

    if active_only:
        query = query.where(
            Subject.is_active.is_(True)
        )

    query = query.order_by(Subject.name)

    result = await db.execute(query)

    subjects = result.scalars().all()

    return [
        {
            "id": subject.id,
            "name": subject.name,
            "code": subject.code,
            "description": subject.description,
            "is_active": subject.is_active,
        }
        for subject in subjects
    ]


@router.get("/subjects/{subject_id}")
async def get_subject(
    subject_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Subject).where(
            Subject.id == subject_id
        )
    )

    subject = result.scalar_one_or_none()

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found",
        )

    return {
        "id": subject.id,
        "name": subject.name,
        "code": subject.code,
        "description": subject.description,
        "is_active": subject.is_active,
    }


# ============================================================
# COURSES
# ============================================================

@router.get("/courses")
async def get_courses(
    board_id: int | None = None,
    subject_id: int | None = None,
    medium_id: int | None = None,
    class_number: int | None = None,
    active_only: bool = True,
    db: AsyncSession = Depends(get_db),
):
    query = select(Course)

    if board_id is not None:
        query = query.where(
            Course.board_id == board_id
        )

    if subject_id is not None:
        query = query.where(
            Course.subject_id == subject_id
        )

    if medium_id is not None:
        query = query.where(
            Course.medium_id == medium_id
        )

    if class_number is not None:
        query = query.where(
            Course.class_number == class_number
        )

    if active_only:
        query = query.where(
            Course.is_active.is_(True)
        )

    query = query.order_by(
        Course.class_number,
        Course.title,
    )

    result = await db.execute(query)

    courses = result.scalars().all()

    return [
        {
            "id": course.id,
            "board_id": course.board_id,
            "subject_id": course.subject_id,
            "medium_id": course.medium_id,
            "class_number": course.class_number,
            "title": course.title,
            "description": course.description,
            "is_active": course.is_active,
            "created_at": course.created_at,
        }
        for course in courses
    ]


@router.get("/courses/{course_id}")
async def get_course(
    course_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Course).where(
            Course.id == course_id
        )
    )

    course = result.scalar_one_or_none()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    return {
        "id": course.id,
        "board_id": course.board_id,
        "subject_id": course.subject_id,
        "medium_id": course.medium_id,
        "class_number": course.class_number,
        "title": course.title,
        "description": course.description,
        "is_active": course.is_active,
        "created_at": course.created_at,
    }


# ============================================================
# SYLLABUS
# ============================================================

@router.get("/syllabus")
async def get_syllabus(
    course_id: int | None = None,
    active_only: bool = True,
    db: AsyncSession = Depends(get_db),
):
    query = select(Syllabus)

    if course_id is not None:
        query = query.where(
            Syllabus.course_id == course_id
        )

    if active_only:
        query = query.where(
            Syllabus.is_active.is_(True)
        )

    query = query.order_by(
        Syllabus.course_id,
        Syllabus.chapter_number,
    )

    result = await db.execute(query)

    syllabus = result.scalars().all()

    return [
        {
            "id": item.id,
            "course_id": item.course_id,
            "chapter_number": item.chapter_number,
            "chapter_name": item.chapter_name,
            "description": item.description,
            "is_active": item.is_active,
        }
        for item in syllabus
    ]


@router.get("/syllabus/{syllabus_id}")
async def get_syllabus_item(
    syllabus_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Syllabus).where(
            Syllabus.id == syllabus_id
        )
    )

    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Syllabus item not found",
        )

    return {
        "id": item.id,
        "course_id": item.course_id,
        "chapter_number": item.chapter_number,
        "chapter_name": item.chapter_name,
        "description": item.description,
        "is_active": item.is_active,
    }