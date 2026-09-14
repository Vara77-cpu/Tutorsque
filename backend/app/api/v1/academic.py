from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.academic import Board, Medium, Subject, Course, Syllabus


router = APIRouter(prefix="/academic", tags=["Academic"])


# ─────────────────────────────────────────────
# BOARDS
# ─────────────────────────────────────────────

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


# ─────────────────────────────────────────────
# MEDIUMS
# ─────────────────────────────────────────────

@router.get("/mediums")
async def get_mediums(
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Medium)
        .where(Medium.is_active.is_(True))
        .order_by(Medium.name)
    )

    mediums = result.scalars().all()

    return [
        {
            "id": medium.id,
            "name": medium.name,
            "code": medium.code,
            "is_active": medium.is_active,
        }
        for medium in mediums
    ]


@router.get("/mediums/{medium_id}")
async def get_medium(
    medium_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Medium).where(Medium.id == medium_id)
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
        "is_active": medium.is_active,
    }


# ─────────────────────────────────────────────
# SUBJECTS
# ─────────────────────────────────────────────

@router.get("/subjects")
async def get_subjects(
    board_id: int | None = None,
    class_number: int | None = None,
    medium_id: int | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Subject)

    if board_id is not None:
        query = query.where(Subject.board_id == board_id)

    if class_number is not None:
        query = query.where(Subject.class_number == class_number)

    if medium_id is not None:
        query = query.where(Subject.medium_id == medium_id)

    query = query.order_by(Subject.name)

    result = await db.execute(query)

    subjects = result.scalars().all()

    return [
        {
            "id": subject.id,
            "name": subject.name,
            "code": subject.code,
            "board_id": subject.board_id,
            "class_number": subject.class_number,
            "medium_id": subject.medium_id,
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
        select(Subject).where(Subject.id == subject_id)
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
        "board_id": subject.board_id,
        "class_number": subject.class_number,
        "medium_id": subject.medium_id,
        "is_active": subject.is_active,
    }


# ─────────────────────────────────────────────
# COURSES
# ─────────────────────────────────────────────

@router.get("/courses")
async def get_courses(
    board_id: int | None = None,
    class_number: int | None = None,
    subject_id: int | None = None,
    medium_id: int | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Course)

    if board_id is not None:
        query = query.where(Course.board_id == board_id)

    if class_number is not None:
        query = query.where(Course.class_number == class_number)

    if subject_id is not None:
        query = query.where(Course.subject_id == subject_id)

    if medium_id is not None:
        query = query.where(Course.medium_id == medium_id)

    result = await db.execute(query)

    courses = result.scalars().all()

    return [
        {
            "id": course.id,
            "name": course.name,
            "code": course.code,
            "board_id": course.board_id,
            "class_number": course.class_number,
            "subject_id": course.subject_id,
            "medium_id": course.medium_id,
        }
        for course in courses
    ]


# ─────────────────────────────────────────────
# SYLLABUS
# ─────────────────────────────────────────────

@router.get("/syllabus")
async def get_syllabus(
    board_id: int | None = None,
    class_number: int | None = None,
    subject_id: int | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Syllabus)

    if board_id is not None:
        query = query.where(Syllabus.board_id == board_id)

    if class_number is not None:
        query = query.where(Syllabus.class_number == class_number)

    if subject_id is not None:
        query = query.where(Syllabus.subject_id == subject_id)

    result = await db.execute(query)

    syllabus = result.scalars().all()

    return [
        {
            "id": item.id,
            "board_id": item.board_id,
            "class_number": item.class_number,
            "subject_id": item.subject_id,
            "chapter": getattr(item, "chapter", None),
            "topic": getattr(item, "topic", None),
        }
        for item in syllabus
    ]