from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SAEnum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class SchoolStatus(str, Enum):
    ACTIVE = "active"
    PENDING = "pending"
    INACTIVE = "inactive"


class SchoolType(str, Enum):
    PARTNER = "partner_school"
    INDEPENDENT = "independent_school"


class School(Base):
    __tablename__ = "schools"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    district: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    state: Mapped[str] = mapped_column(
        String(100),
        default="Andhra Pradesh",
        nullable=False,
    )

    board_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    school_type: Mapped[SchoolType] = mapped_column(
        SAEnum(SchoolType),
        default=SchoolType.PARTNER,
        nullable=False,
    )

    contact_name: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    contact_phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    contact_email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    status: Mapped[SchoolStatus] = mapped_column(
        SAEnum(SchoolStatus),
        default=SchoolStatus.PENDING,
        nullable=False,
        index=True,
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