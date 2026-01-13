@echo off
REM Quiz Builder Setup Script for Windows
REM This script sets up and starts both backend and frontend servers

setlocal enabledelayedexpansion

echo.
echo ================================================
echo Quiz Builder - Full Stack Setup
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo.

REM Backend Setup
echo ================================================
echo Setting up Backend...
echo ================================================
echo.

cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install backend dependencies
        cd ..
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)

echo.
echo Setting up database...
call npm run prisma:generate
if %errorlevel% neq 0 (
    echo Error: Failed to generate Prisma client
    cd ..
    exit /b 1
)

if not exist "dev.db" (
    echo Creating database...
    call npm run prisma:migrate
    if %errorlevel% neq 0 (
        echo Error: Failed to create database
        cd ..
        exit /b 1
    )
    echo.
    echo Seeding sample data...
    call npm run seed
) else (
    echo Database already exists
)

echo.
echo Backend setup complete!
echo.

REM Frontend Setup
echo ================================================
echo Setting up Frontend...
echo ================================================
echo.

cd ..\frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install frontend dependencies
        cd ..
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)

echo.
echo Frontend setup complete!
echo.

REM Instructions
echo ================================================
echo Setup Complete! 
echo ================================================
echo.
echo To start the application:
echo.
echo 1. Start the backend (in command prompt/PowerShell 1):
echo    cd backend
echo    npm run dev
echo.
echo 2. Start the frontend (in command prompt/PowerShell 2):
echo    cd frontend
echo    npm run dev
echo.
echo Then open your browser to: http://localhost:3000
echo.
echo API will be running at: http://localhost:5000
echo.
echo ================================================
echo.

pause
