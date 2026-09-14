from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.students import router as students_router
from app.api.v1.academic import router as academic_router
from app.api.v1.teachers import router as teachers_router



api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(students_router)
api_router.include_router(academic_router)
api_router.include_router(teachers_router)