from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import api_router
from app.core.config import settings
from app.core.database import close_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("TutorsQue API starting...")
    print(f"Environment: {settings.environment}")

    yield

    await close_database()
    print("TutorsQue API shutting down...")


app = FastAPI(
    title=settings.app_name,
    description="Backend API for the TutorsQue education platform.",
    version=settings.app_version,
    lifespan=lifespan,
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# API ROUTERS
# ============================================================

app.include_router(api_router)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
async def root():
    return {
        "name": "TutorsQue API",
        "version": settings.app_version,
        "status": "running",
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "tutorsque-api",
    }


@app.get("/api/v1/health")
async def api_health_check():
    return {
        "status": "healthy",
        "service": "tutorsque-api",
        "version": settings.app_version,
    }


# ============================================================
# SYSTEM INFORMATION
# ============================================================

@app.get("/api/v1/system")
async def system_info():
    return {
        "application": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
    }


# ============================================================
# META INFORMATION
# ============================================================

@app.get("/api/v1/meta")
async def meta_info():
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "api_prefix": "/api/v1",
    }