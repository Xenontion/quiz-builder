#!/bin/bash

# Quiz Builder Setup Script
# This script sets up and starts both backend and frontend servers

set -e

echo "================================================"
echo "Quiz Builder - Full Stack Setup"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Backend Setup
echo "================================================"
echo "Setting up Backend..."
echo "================================================"

cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

echo ""
echo "🔧 Setting up database..."
npm run prisma:generate

if [ ! -f "dev.db" ]; then
    echo "📊 Creating database..."
    npm run prisma:migrate
    echo ""
    echo "🌱 Seeding sample data..."
    npm run seed
else
    echo "✅ Database already exists"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""

# Frontend Setup
echo "================================================"
echo "Setting up Frontend..."
echo "================================================"

cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

echo "✅ Frontend setup complete!"
echo ""

# Instructions
echo "================================================"
echo "Setup Complete! 🎉"
echo "================================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Start the backend (in terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. Start the frontend (in terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "Then open your browser to: http://localhost:3000"
echo ""
echo "API will be running at: http://localhost:5000"
echo ""
echo "================================================"
