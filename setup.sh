#!/bin/bash

# Setup Script for Money Investment System
# ใช้สำหรับติดตั้งและตั้งค่าระบบทั้งหมด

set -e

echo "🚀 เริ่มต้นการติดตั้ง Money Investment System..."

# ตรวจสอบ Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ไม่ได้ติดตั้ง กรุณาติดตั้ง Node.js 18+ ก่อน"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version ต้องเป็น 18+ ปัจจุบันเป็น $NODE_VERSION"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# ตรวจสอบ npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm ไม่ได้ติดตั้ง"
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# ตรวจสอบ Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker ไม่ได้ติดตั้ง กรุณาติดตั้ง Docker ก่อน"
    exit 1
fi

echo "✅ Docker version: $(docker --version)"

# ตรวจสอบ Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose ไม่ได้ติดตั้ง กรุณาติดตั้ง Docker Compose ก่อน"
    exit 1
fi

echo "✅ Docker Compose version: $(docker-compose --version)"

# สร้างไฟล์ .env จาก .env.example
if [ ! -f .env ]; then
    echo "📝 สร้างไฟล์ .env..."
    cp .env.example .env
    echo "⚠️  กรุณาแก้ไขไฟล์ .env ให้ตรงกับ environment ของคุณ"
else
    echo "✅ ไฟล์ .env มีอยู่แล้ว"
fi

# ติดตั้ง Frontend Dependencies
echo "🎨 ติดตั้ง Frontend Dependencies..."
cd frontend
npm install
cd ..

# สร้าง Backend Services (ถ้ายังไม่มี)
echo "🔧 สร้าง Backend Services..."

# Auth Service
if [ ! -d "backend/auth-service" ]; then
    echo "  - สร้าง Auth Service..."
    mkdir -p backend/auth-service/src/{domain,application,infrastructure,presentation}
    cp backend/auth-service/package.json backend/auth-service/
    cp backend/auth-service/tsconfig.json backend/auth-service/
fi

# User Service
if [ ! -d "backend/user-service" ]; then
    echo "  - สร้าง User Service..."
    mkdir -p backend/user-service/src/{domain,application,infrastructure,presentation}
    cp backend/auth-service/package.json backend/user-service/
    sed -i '' 's/auth-service/user-service/g' backend/user-service/package.json
    cp backend/auth-service/tsconfig.json backend/user-service/
fi

# Finance Service
if [ ! -d "backend/finance-service" ]; then
    echo "  - สร้าง Finance Service..."
    mkdir -p backend/finance-service/src/{domain,application,infrastructure,presentation}
    cp backend/auth-service/package.json backend/finance-service/
    sed -i '' 's/auth-service/finance-service/g' backend/finance-service/package.json
    cp backend/auth-service/tsconfig.json backend/finance-service/
fi

# Investment Service
if [ ! -d "backend/investment-service" ]; then
    echo "  - สร้าง Investment Service..."
    mkdir -p backend/investment-service/src/{domain,application,infrastructure,presentation}
    cp backend/auth-service/package.json backend/investment-service/
    sed -i '' 's/auth-service/investment-service/g' backend/investment-service/package.json
    cp backend/auth-service/tsconfig.json backend/investment-service/
fi

# Payment Service
if [ ! -d "backend/payment-service" ]; then
    echo "  - สร้าง Payment Service..."
    mkdir -p backend/payment-service/src/{domain,application,infrastructure,presentation}
    cp backend/auth-service/package.json backend/payment-service/
    sed -i '' 's/auth-service/payment-service/g' backend/payment-service/package.json
    cp backend/auth-service/tsconfig.json backend/payment-service/
fi

# ติดตั้ง Backend Dependencies
echo "🔧 ติดตั้ง Backend Dependencies..."
for service in auth-service user-service finance-service investment-service payment-service; do
    if [ -d "backend/$service" ]; then
        echo "  - ติดตั้ง $service..."
        cd backend/$service
        npm install
        cd ../..
    fi
done

# สร้าง API Gateway Configuration
echo "🌐 สร้าง API Gateway Configuration..."
mkdir -p api-gateway
cat > api-gateway/krakend.json << 'EOF'
{
  "version": 3,
  "name": "Money Investment System API Gateway",
  "port": 8000,
  "cache_ttl": "3600s",
  "timeout": "3s",
  "extra_config": {
    "security/cors": {
      "allow_origins": ["http://localhost:3000", "https://your-domain.com"],
      "allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      "allow_headers": ["Origin", "Authorization", "Content-Type"],
      "expose_headers": ["Content-Length"],
      "max_age": "12h"
    }
  },
  "endpoints": [
    {
      "endpoint": "/auth/*",
      "method": "GET",
      "backend": [
        {
          "url_pattern": "/auth/*",
          "host": ["auth-service:3001"]
        }
      ]
    },
    {
      "endpoint": "/auth/*",
      "method": "POST",
      "backend": [
        {
          "url_pattern": "/auth/*",
          "host": ["auth-service:3001"]
        }
      ]
    },
    {
      "endpoint": "/users/*",
      "method": "GET",
      "backend": [
        {
          "url_pattern": "/users/*",
          "host": ["user-service:3002"]
        }
      ]
    },
    {
      "endpoint": "/finance/*",
      "method": "GET",
      "backend": [
        {
          "url_pattern": "/finance/*",
          "host": ["finance-service:3003"]
        }
      ]
    },
    {
      "endpoint": "/investments/*",
      "method": "GET",
      "backend": [
        {
          "url_pattern": "/investments/*",
          "host": ["investment-service:3004"]
        }
      ]
    },
    {
      "endpoint": "/payments/*",
      "method": "GET",
      "backend": [
        {
          "url_pattern": "/payments/*",
          "host": ["payment-service:3005"]
        }
      ]
    }
  ]
}
EOF

# สร้าง Database Schema
echo "🗄️ สร้าง Database Schema..."
mkdir -p database
cat > database/init.sql << 'EOF'
-- Money Investment System Database Schema

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user',
    plan VARCHAR(50) DEFAULT 'free',
    status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    trial_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(20) NOT NULL, -- 'income' or 'expense'
    category VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Goals
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0,
    deadline DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investments
CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'stock', 'fund', 'gold', etc.
    amount DECIMAL(15,2) NOT NULL,
    current_value DECIMAL(15,2),
    purchase_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    proof_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Packages
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    features JSONB,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default packages
INSERT INTO packages (name, price, duration, features) VALUES
('Free Trial', 0, '30 days', '["Dashboard พื้นฐาน", "ติดตามรายรับรายจ่าย", "เป้าหมายทางการเงิน 3 รายการ"]'),
('Basic', 299, 'month', '["ทุกอย่างใน Free Trial", "วิเคราะห์สุขภาพทางการเงิน", "เป้าหมายทางการเงินไม่จำกัด", "แผนภาษีพื้นฐาน"]'),
('Premium', 599, 'month', '["ทุกอย่างใน Basic", "การลงทุนขั้นสูง", "แผนภาษีขั้นสูง", "ที่ปรึกษาการเงินส่วนตัว"]');

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
EOF

# สร้าง Nginx Configuration
echo "🌐 สร้าง Nginx Configuration..."
mkdir -p nginx
cat > nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream api_gateway {
        server api-gateway:8000;
    }

    server {
        listen 80;
        server_name localhost;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # API Gateway
        location /api/ {
            proxy_pass http://api_gateway/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
EOF

# สร้าง Makefile สำหรับคำสั่งที่ใช้บ่อย
echo "🔧 สร้าง Makefile..."
cat > Makefile << 'EOF'
.PHONY: help install dev build up down clean logs test

help: ## แสดงคำสั่งที่ใช้งานได้
	@echo "Money Investment System - คำสั่งที่ใช้งานได้:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## ติดตั้ง dependencies ทั้งหมด
	@echo "ติดตั้ง Frontend dependencies..."
	cd frontend && npm install
	@echo "ติดตั้ง Backend dependencies..."
	cd backend/auth-service && npm install
	cd ../user-service && npm install
	cd ../finance-service && npm install
	cd ../investment-service && npm install
	cd ../payment-service && npm install

dev: ## รันระบบใน development mode
	@echo "รันระบบใน development mode..."
	docker-compose up

build: ## Build Docker images
	@echo "Build Docker images..."
	docker-compose build

up: ## รันระบบใน background
	@echo "รันระบบใน background..."
	docker-compose up -d

down: ## หยุดระบบ
	@echo "หยุดระบบ..."
	docker-compose down

clean: ## ลบ containers และ volumes
	@echo "ลบ containers และ volumes..."
	docker-compose down -v --remove-orphans
	docker system prune -f

logs: ## แสดง logs
	@echo "แสดง logs..."
	docker-compose logs -f

test: ## รัน tests
	@echo "รัน Frontend tests..."
	cd frontend && npm test
	@echo "รัน Backend tests..."
	cd backend/auth-service && npm test
	cd ../user-service && npm test
	cd ../finance-service && npm test
	cd ../investment-service && npm test
	cd ../payment-service && npm test

db-reset: ## รีเซ็ตฐานข้อมูล
	@echo "รีเซ็ตฐานข้อมูล..."
	docker-compose down -v
	docker-compose up -d postgres
	sleep 10
	docker-compose exec postgres psql -U postgres -d money_app -f /docker-entrypoint-initdb.d/init.sql

frontend-dev: ## รัน Frontend ใน development mode
	@echo "รัน Frontend ใน development mode..."
	cd frontend && npm run dev

backend-dev: ## รัน Backend services ใน development mode
	@echo "รัน Backend services ใน development mode..."
	cd backend/auth-service && npm run dev &
	cd ../user-service && npm run dev &
	cd ../finance-service && npm run dev &
	cd ../investment-service && npm run dev &
	cd ../payment-service && npm run dev &
	wait
EOF

# ทำให้ script สามารถรันได้
chmod +x setup.sh
chmod +x deploy-railway.sh

echo "✅ การติดตั้งเสร็จสิ้น!"
echo ""
echo "🚀 คำสั่งที่ใช้งานได้:"
echo "  - make help          # แสดงคำสั่งทั้งหมด"
echo "  - make install       # ติดตั้ง dependencies"
echo "  - make dev           # รันระบบใน development mode"
echo "  - make build         # Build Docker images"
echo "  - make up            # รันระบบใน background"
echo "  - make down          # หยุดระบบ"
echo "  - make clean         # ลบ containers และ volumes"
echo "  - make logs          # แสดง logs"
echo "  - make test          # รัน tests"
echo "  - make frontend-dev  # รัน Frontend development server"
echo "  - make backend-dev   # รัน Backend development servers"
echo ""
echo "📝 ขั้นตอนต่อไป:"
echo "  1. แก้ไขไฟล์ .env ให้ตรงกับ environment ของคุณ"
echo "  2. รัน 'make install' เพื่อติดตั้ง dependencies"
echo "  3. รัน 'make dev' เพื่อเริ่มต้นระบบ"
echo "  4. เปิดเบราว์เซอร์ไปที่ http://localhost:3000"
echo ""
echo "🔗 ดูข้อมูลเพิ่มเติมได้ที่ README.md"
