#!/bin/bash

# Railway Deployment Script for Money Investment System
# ใช้สำหรับ deploy ทุก service บน Railway

set -e

echo "🚀 เริ่มต้นการ Deploy บน Railway..."

# ตรวจสอบว่า Railway CLI ติดตั้งแล้วหรือไม่
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI ไม่ได้ติดตั้ง กรุณาติดตั้งก่อน: npm install -g @railway/cli"
    exit 1
fi

# ตรวจสอบว่า login แล้วหรือไม่
if ! railway whoami &> /dev/null; then
    echo "🔐 กรุณา login Railway ก่อน: railway login"
    exit 1
fi

# สร้าง project ใหม่ (ถ้ายังไม่มี)
echo "📁 สร้าง Railway project..."
PROJECT_NAME="money-investment-system"
railway project create $PROJECT_NAME --public

# Deploy Frontend
echo "🎨 Deploy Frontend..."
cd frontend
railway up --service frontend
cd ..

# Deploy Backend Services
echo "🔧 Deploy Backend Services..."

# Auth Service
echo "  - Auth Service..."
cd backend/auth-service
railway up --service auth-service
cd ../..

# User Service
echo "  - User Service..."
cd backend/user-service
railway up --service user-service
cd ../..

# Finance Service
echo "  - Finance Service..."
cd backend/finance-service
railway up --service finance-service
cd ../..

# Investment Service
echo "  - Investment Service..."
cd backend/investment-service
railway up --service investment-service
cd ../..

# Payment Service
echo "  - Payment Service..."
cd backend/payment-service
railway up --service payment-service
cd ../..

# Deploy API Gateway
echo "🌐 Deploy API Gateway..."
cd api-gateway
railway up --service api-gateway
cd ..

# Deploy Database
echo "🗄️ Deploy PostgreSQL Database..."
railway up --service postgres

# Deploy Redis
echo "⚡ Deploy Redis Cache..."
railway up --service redis

echo "✅ การ Deploy เสร็จสิ้น!"
echo ""
echo "📊 ข้อมูลการ Deploy:"
echo "  - Frontend: https://frontend-production-xxxx.up.railway.app"
echo "  - API Gateway: https://api-gateway-production-xxxx.up.railway.app"
echo "  - Database: postgresql://..."
echo ""
echo "🔗 ดูข้อมูลเพิ่มเติมได้ที่: https://railway.app/dashboard"

# แสดง environment variables ที่จำเป็น
echo ""
echo "🔧 Environment Variables ที่จำเป็น:"
echo "  - DATABASE_URL"
echo "  - REDIS_URL"
echo "  - JWT_SECRET"
echo "  - NODE_ENV=production"
