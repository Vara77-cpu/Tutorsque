from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class StudentProfileCreate(BaseModel):
    class_number: int = Field(ge=1, le=10)
    board_id: int | None = None
    medium_id: int | None = None
    school_id: int | None = None
    parent_id: int | None = None
    date_of_birth: date | None = None
    gender: str | None = Field(default=None, max_length=30)
    address: str | None = Field(default=None, max_length=500)


class StudentProfileUpdate(BaseModel):
    class_number: int | None = Field(
        default=None,
        ge=1,
        le=10,
    )
    board_id: int | None = None
    medium_id: int | None = None
    school_id: int | None = None
    parent_id: int | None = None
    date_of_birth: date | None = None
    gender: str | None = Field(default=None, max_length=30)
    address: str | None = Field(default=None, max_length=500)


class StudentProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    parent_id: int | None
    school_id: int | None

    board_id: int | None
    board_name: str | None = None

    medium_id: int | None
    medium_name: str | None = None

    class_number: int
    date_of_birth: date | None
    gender: str | None
    address: str | None