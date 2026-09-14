from datetime import date, datetime
from enum import Enum

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class EarningStatus(str, Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    PAYABLE = "payable"
    PAID = "paid"
    REVERSED = "reversed"


class PayoutStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    PAID = "paid"
    FAILED = "failed"


class TeacherRate(Base):
    __tablename__ = "teacher_rates"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    teacher_id: Mapped[int] = mapped_column(
        ForeignKey("teachers.id"),
        nullable=False,
        index=True,
    )

    class_number: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    subject_id: Mapped[int | None] = mapped_column(
        ForeignKey("subjects.id"),
        nullable=True,
        index=True,
    )

    board_id: Mapped[int | None] = mapped_column(
        ForeignKey("boards.id"),
        nullable=True,
        index=True,
    )

    duration_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=60,
    )

    rate: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    currency: Mapped[str] = mapped_column(
        String(3),
        nullable=False,
        default="INR",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )


class EarningsLedger(Base):
    __tablename__ = "earnings_ledger"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    teacher_id: Mapped[int] = mapped_column(
        ForeignKey("teachers.id"),
        nullable=False,
        index=True,
    )

    batch_id: Mapped[int | None] = mapped_column(
        ForeignKey("batches.id"),
        nullable=True,
        index=True,
    )

    reference: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    class_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    duration_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    gross_amount: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    platform_adjustment: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    payable_amount: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    status: Mapped[EarningStatus] = mapped_column(
        default=EarningStatus.PENDING,
        nullable=False,
    )

    verified_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class PayoutPeriod(Base):
    __tablename__ = "payout_periods"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    period_start: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    period_end: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    status: Mapped[PayoutStatus] = mapped_column(
        default=PayoutStatus.PENDING,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class TeacherPayout(Base):
    __tablename__ = "teacher_payouts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    teacher_id: Mapped[int] = mapped_column(
        ForeignKey("teachers.id"),
        nullable=False,
        index=True,
    )

    payout_period_id: Mapped[int] = mapped_column(
        ForeignKey("payout_periods.id"),
        nullable=False,
        index=True,
    )

    gross_amount: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    adjustment_amount: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    payout_amount: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    status: Mapped[PayoutStatus] = mapped_column(
        default=PayoutStatus.PENDING,
        nullable=False,
    )

    provider_reference: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    paid_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )