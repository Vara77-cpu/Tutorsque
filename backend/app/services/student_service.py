from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.academic import Board, Medium
from app.models.student import Student
from app.schemas.student import (
    StudentProfileCreate,
    StudentProfileUpdate,
)


class StudentService:

    # ========================================================
    # GET STUDENT PROFILE
    # ========================================================

    async def get_profile(
        self,
        db: AsyncSession,
        user_id: int,
    ) -> dict | None:

        result = await db.execute(
            select(
                Student,
                Board.name.label("board_name"),
                Medium.name.label("medium_name"),
            )
            .outerjoin(
                Board,
                Board.id == Student.board_id,
            )
            .outerjoin(
                Medium,
                Medium.id == Student.medium_id,
            )
            .where(
                Student.user_id == user_id
            )
        )

        row = result.first()

        if row is None:
            return None

        student, board_name, medium_name = row

        return {
            "id": student.id,
            "user_id": student.user_id,
            "parent_id": student.parent_id,
            "school_id": student.school_id,

            "board_id": student.board_id,
            "board_name": board_name,

            "medium_id": student.medium_id,
            "medium_name": medium_name,

            "class_number": student.class_number,
            "date_of_birth": student.date_of_birth,
            "gender": student.gender,
            "address": student.address,
        }

    # ========================================================
    # CREATE STUDENT PROFILE
    # ========================================================

    async def create_profile(
        self,
        db: AsyncSession,
        user_id: int,
        payload: StudentProfileCreate,
    ) -> Student:

        existing = await self._get_student_only(
            db,
            user_id,
        )

        if existing is not None:
            raise ValueError(
                "Student profile already exists"
            )

        # ----------------------------------------------------
        # Validate board
        # ----------------------------------------------------

        if payload.board_id is not None:
            board = await db.get(
                Board,
                payload.board_id,
            )

            if board is None:
                raise ValueError(
                    "Selected board was not found"
                )

            if not board.is_active:
                raise ValueError(
                    "Selected board is not active"
                )

        # ----------------------------------------------------
        # Validate medium
        # ----------------------------------------------------

        if payload.medium_id is not None:
            medium = await db.get(
                Medium,
                payload.medium_id,
            )

            if medium is None:
                raise ValueError(
                    "Selected medium was not found"
                )

        # ----------------------------------------------------
        # Create student
        # ----------------------------------------------------

        student = Student(
            user_id=user_id,
            class_number=payload.class_number,
            board_id=payload.board_id,
            medium_id=payload.medium_id,
            school_id=payload.school_id,
            parent_id=payload.parent_id,
            date_of_birth=payload.date_of_birth,
            gender=payload.gender,
            address=payload.address,
        )

        db.add(student)

        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise

        await db.refresh(student)

        return student

    # ========================================================
    # UPDATE STUDENT PROFILE
    # ========================================================

    async def update_profile(
        self,
        db: AsyncSession,
        user_id: int,
        payload: StudentProfileUpdate,
    ) -> Student:

        student = await self._get_student_only(
            db,
            user_id,
        )

        if student is None:
            raise ValueError(
                "Student profile not found"
            )

        update_data = payload.model_dump(
            exclude_unset=True,
        )

        # ----------------------------------------------------
        # Validate board when supplied
        # ----------------------------------------------------

        if "board_id" in update_data:
            board_id = update_data["board_id"]

            if board_id is not None:
                board = await db.get(
                    Board,
                    board_id,
                )

                if board is None:
                    raise ValueError(
                        "Selected board was not found"
                    )

                if not board.is_active:
                    raise ValueError(
                        "Selected board is not active"
                    )

        # ----------------------------------------------------
        # Validate medium when supplied
        # ----------------------------------------------------

        if "medium_id" in update_data:
            medium_id = update_data["medium_id"]

            if medium_id is not None:
                medium = await db.get(
                    Medium,
                    medium_id,
                )

                if medium is None:
                    raise ValueError(
                        "Selected medium was not found"
                    )

        # ----------------------------------------------------
        # Apply updates
        # ----------------------------------------------------

        for field, value in update_data.items():
            setattr(
                student,
                field,
                value,
            )

        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise

        await db.refresh(student)

        return student

    # ========================================================
    # INTERNAL STUDENT LOOKUP
    # ========================================================

    async def _get_student_only(
        self,
        db: AsyncSession,
        user_id: int,
    ) -> Student | None:

        result = await db.execute(
            select(Student).where(
                Student.user_id == user_id
            )
        )

        return result.scalar_one_or_none()


# ============================================================
# SERVICE INSTANCE
# ============================================================

student_service = StudentService()