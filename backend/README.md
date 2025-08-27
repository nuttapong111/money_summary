# Backend Microservices

ระบบ backend ที่ใช้ Clean Architecture และ Hono framework

## 🏗️ โครงสร้าง

```
backend/
├── auth-service/          # Authentication Service
├── user-service/          # User Management Service
├── finance-service/       # Financial Data Service
├── investment-service/    # Investment Service
└── payment-service/       # Payment Service
```

## 🚀 การติดตั้ง

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis (สำหรับ caching)

### การติดตั้งแต่ละ Service

```bash
# ติดตั้ง dependencies สำหรับทุก service
cd backend
npm run install:all

# หรือติดตั้งทีละ service
cd auth-service
npm install

cd ../user-service
npm install
# ... ทำแบบเดียวกันกับ service อื่นๆ
```

## 🏛️ Clean Architecture

แต่ละ service ใช้ Clean Architecture pattern:

```
src/
├── domain/           # Business logic และ entities
├── application/      # Use cases และ application services
├── infrastructure/   # External interfaces (DB, API, etc.)
└── presentation/     # Controllers และ routes
```

## 🔧 Environment Variables

สร้างไฟล์ `.env` ในแต่ละ service:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-secret-key

# Redis
REDIS_URL=redis://localhost:6379

# Service URLs
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
FINANCE_SERVICE_URL=http://localhost:3003
INVESTMENT_SERVICE_URL=http://localhost:3004
PAYMENT_SERVICE_URL=http://localhost:3005
```

## 🚀 การรัน

### Development Mode

```bash
# รันทุก service พร้อมกัน
npm run dev:all

# หรือรันทีละ service
cd auth-service
npm run dev

cd ../user-service
npm run dev
# ... ทำแบบเดียวกันกับ service อื่นๆ
```

### Production Mode

```bash
# Build และรัน
npm run build
npm start
```

## 📊 API Documentation

### Auth Service (Port 3001)
- `POST /auth/register` - ลงทะเบียนผู้ใช้งาน
- `POST /auth/login` - เข้าสู่ระบบ
- `POST /auth/refresh` - รีเฟรช token
- `POST /auth/logout` - ออกจากระบบ

### User Service (Port 3002)
- `GET /users/profile` - ดูข้อมูลโปรไฟล์
- `PUT /users/profile` - อัปเดตข้อมูลโปรไฟล์
- `GET /users/:id` - ดูข้อมูลผู้ใช้งานตาม ID

### Finance Service (Port 3003)
- `GET /finance/overview` - ภาพรวมการเงิน
- `POST /finance/transactions` - เพิ่มรายการ
- `GET /finance/transactions` - ดูรายการทั้งหมด
- `GET /finance/health` - สุขภาพการเงิน

### Investment Service (Port 3004)
- `GET /investments/portfolio` - พอร์ตการลงทุน
- `POST /investments` - เพิ่มการลงทุน
- `GET /investments/analytics` - วิเคราะห์การลงทุน

### Payment Service (Port 3005)
- `POST /payments` - สร้างการชำระเงิน
- `GET /payments` - ดูการชำระเงินทั้งหมด
- `PUT /payments/:id/approve` - อนุมัติการชำระเงิน

## 🧪 Testing

```bash
# รัน test ทั้งหมด
npm run test:all

# รัน test เฉพาะ service
cd auth-service
npm test
```

## 📦 Docker

```bash
# Build images
docker-compose build

# รัน services
docker-compose up

# รันใน background
docker-compose up -d
```

## 🔍 Monitoring

- **Health Check**: `GET /health`
- **Metrics**: `GET /metrics`
- **Logs**: ใช้ Winston logger

## 🚨 Error Handling

ระบบใช้ centralized error handling:

```typescript
// Domain Error
export class DomainError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

// Application Error
export class ApplicationError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}
```

## 📝 Logging

ใช้ Winston สำหรับ structured logging:

```typescript
import { logger } from '../infrastructure/logger';

logger.info('User registered successfully', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString()
});
```

## 🔐 Security

- JWT Authentication
- Rate Limiting
- Input Validation
- CORS Configuration
- Helmet Security Headers
