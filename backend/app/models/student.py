from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    parent_id: Mapped[int | None] = mapped_column(
        ForeignKey("parents.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    school_id: Mapped[int | None] = mapped_column(
        ForeignKey("schools.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    gender: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    class_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    board_id: Mapped[int | None] = mapped_column(
        ForeignKey("boards.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    medium_id: Mapped[int | None] = mapped_column(
        ForeignKey("mediums.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    address: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )