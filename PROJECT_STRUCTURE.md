# 🚀 Money App - โครงสร้างโปรเจกต์

## 📁 โครงสร้างโฟลเดอร์

```
money_app/
├── 📁 frontend/                          # Next.js Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/               # React Components
│   │   ├── 📁 pages/                    # Next.js Pages
│   │   ├── 📁 styles/                   # CSS & Styling
│   │   ├── 📁 utils/                    # Utility Functions
│   │   ├── 📁 hooks/                    # Custom React Hooks
│   │   ├── 📁 types/                    # TypeScript Types
│   │   └── 📁 contexts/                 # React Contexts
│   ├── 📁 public/                       # Static Assets
│   ├── 📁 tests/                        # Test Files
│   ├── 📄 package.json                  # Frontend Dependencies
│   ├── 📄 next.config.js                # Next.js Configuration
│   ├── 📄 tailwind.config.js            # Tailwind CSS Configuration
│   ├── 📄 tsconfig.json                 # TypeScript Configuration
│   ├── 📄 jest.config.js                # Jest Configuration
│   └── 📄 Dockerfile                    # Frontend Docker Image
│
├── 📁 backend/                           # Microservices Backend
│   ├── 📁 user-service/                 # User Management Service
│   │   ├── 📁 src/
│   │   │   ├── 📁 entities/            # Domain Entities
│   │   │   ├── 📁 usecases/            # Business Logic
│   │   │   ├── 📁 interfaces/          # Repository Interfaces
│   │   │   ├── 📁 infrastructure/      # Database & External
│   │   │   └── 📁 application/         # Controllers & Middleware
│   │   ├── 📁 tests/                    # Service Tests
│   │   ├── 📁 config/                   # Configuration Files
│   │   ├── 📄 package.json             # Service Dependencies
│   │   ├── 📄 tsconfig.json            # TypeScript Configuration
│   │   ├── 📄 Dockerfile               # Service Docker Image
│   │   └── 📄 env.example              # Environment Variables
│   │
│   ├── 📁 financial-service/            # Financial Management Service
│   │   ├── 📁 src/
│   │   │   ├── 📁 entities/            # Financial Entities
│   │   │   ├── 📁 usecases/            # Financial Business Logic
│   │   │   ├── 📁 interfaces/          # Financial Interfaces
│   │   │   ├── 📁 infrastructure/      # Financial Infrastructure
│   │   │   └── 📁 application/         # Financial Controllers
│   │   ├── 📁 tests/                    # Financial Service Tests
│   │   ├── 📁 config/                   # Financial Configuration
│   │   ├── 📄 package.json             # Financial Dependencies
│   │   ├── 📄 tsconfig.json            # Financial TypeScript Config
│   │   └── 📄 Dockerfile               # Financial Docker Image
│   │
│   ├── 📁 investment-service/           # Investment Management Service
│   │   ├── 📁 src/
│   │   │   ├── 📁 entities/            # Investment Entities
│   │   │   ├── 📁 usecases/            # Investment Business Logic
│   │   │   ├── 📁 interfaces/          # Investment Interfaces
│   │   │   ├── 📁 infrastructure/      # Investment Infrastructure
│   │   │   └── 📁 application/         # Investment Controllers
│   │   ├── 📁 tests/                    # Investment Service Tests
│   │   ├── 📁 config/                   # Investment Configuration
│   │   ├── 📄 package.json             # Investment Dependencies
│   │   ├── 📄 tsconfig.json            # Investment TypeScript Config
│   │   └── 📄 Dockerfile               # Investment Docker Image
│   │
│   ├── 📁 notification-service/         # Notification Service
│   │   ├── 📁 src/
│   │   │   ├── 📁 entities/            # Notification Entities
│   │   │   ├── 📁 usecases/            # Notification Business Logic
│   │   │   ├── 📁 interfaces/          # Notification Interfaces
│   │   │   ├── 📁 infrastructure/      # Notification Infrastructure
│   │   │   └── 📁 application/         # Notification Controllers
│   │   ├── 📁 tests/                    # Notification Service Tests
│   │   ├── 📁 config/                   # Notification Configuration
│   │   ├── 📄 package.json             # Notification Dependencies
│   │   ├── 📄 tsconfig.json            # Notification TypeScript Config
│   │   └── 📄 Dockerfile               # Notification Docker Image
│   │
│   ├── 📁 payment-service/              # Payment Management Service
│   │   ├── 📁 src/
│   │   │   ├── 📁 entities/            # Payment Entities
│   │   │   ├── 📁 usecases/            # Payment Business Logic
│   │   │   ├── 📁 interfaces/          # Payment Interfaces
│   │   │   ├── 📁 infrastructure/      # Payment Infrastructure
│   │   │   └── 📁 application/         # Payment Controllers
│   │   ├── 📁 tests/                    # Payment Service Tests
│   │   ├── 📁 config/                   # Payment Configuration
│   │   ├── 📄 package.json             # Payment Dependencies
│   │   ├── 📄 tsconfig.json            # Payment TypeScript Config
│   │   └── 📄 Dockerfile               # Payment Docker Image
│   │
│   └── 📁 analytics-service/            # Analytics & Reporting Service
│       ├── 📁 src/
│       │   ├── 📁 entities/            # Analytics Entities
│       │   ├── 📁 usecases/            # Analytics Business Logic
│       │   ├── 📁 interfaces/          # Analytics Interfaces
│       │   ├── 📁 infrastructure/      # Analytics Infrastructure
│       │   └── 📁 application/         # Analytics Controllers
│       ├── 📁 tests/                    # Analytics Service Tests
│       ├── 📁 config/                   # Analytics Configuration
│       ├── 📄 package.json             # Analytics Dependencies
│       ├── 📄 tsconfig.json            # Analytics TypeScript Config
│       └── 📄 Dockerfile               # Analytics Docker Image
│
├── 📁 gateway/                           # KrakenD API Gateway
│   └── 📄 krakend.json                  # Gateway Configuration
│
├── 📁 shared/                            # Shared Libraries
│   ├── 📁 types/                        # Shared TypeScript Types
│   ├── 📁 utils/                        # Shared Utility Functions
│   ├── 📁 constants/                    # Shared Constants
│   └── 📁 interfaces/                   # Shared Interfaces
│
├── 📁 docker/                            # Docker Configuration
│   ├── 📁 postgres/                     # PostgreSQL Configuration
│   │   └── 📄 init.sql                  # Database Initialization
│   └── 📁 redis/                        # Redis Configuration
│
├── 📁 docs/                              # Documentation
│   ├── 📁 api/                          # API Documentation
│   ├── 📁 architecture/                 # Architecture Documentation
│   │   └── 📄 README.md                 # Architecture Overview
│   └── 📁 deployment/                   # Deployment Documentation
│
├── 📁 scripts/                           # Utility Scripts
│
├── 📄 package.json                       # Root Package Configuration
├── 📄 docker-compose.yml                 # Production Docker Compose
├── 📄 docker-compose.dev.yml             # Development Docker Compose
├── 📄 Makefile                          # Development Commands
├── 📄 .gitignore                        # Git Ignore Rules
├── 📄 .dockerignore                      # Docker Ignore Rules
├── 📄 README.md                          # Project Overview
└── 📄 PROJECT_STRUCTURE.md               # This File
```

## 🏗️ Clean Architecture Layers

### 📊 Entities Layer
- **User**: ผู้ใช้ระบบ
- **Transaction**: ธุรกรรมทางการเงิน
- **Investment**: การลงทุน
- **FinancialGoal**: เป้าหมายการเงิน
- **PaymentRequest**: คำขอชำระเงิน
- **Notification**: การแจ้งเตือน

### 🔄 Use Cases Layer
- **UserManagement**: จัดการผู้ใช้
- **Authentication**: การยืนยันตัวตน
- **FinancialTracking**: ติดตามการเงิน
- **InvestmentManagement**: จัดการการลงทุน
- **PaymentProcessing**: ประมวลผลการชำระเงิน
- **Analytics**: การวิเคราะห์ข้อมูล

### 🔌 Interface Adapters Layer
- **Controllers**: จัดการ HTTP requests
- **Repositories**: จัดการข้อมูล
- **Presenters**: แสดงผลข้อมูล
- **Gateways**: เชื่อมต่อระบบภายนอก

### 🛠️ Frameworks & Drivers Layer
- **Hono**: Web framework
- **PostgreSQL**: Database
- **Redis**: Cache
- **Next.js**: Frontend framework
- **Tailwind CSS**: Styling

## 🌐 Service Communication

```
Frontend (3000) → KrakenD Gateway (8080) → Microservices
                                                ├── User Service (3001)
                                                ├── Financial Service (3002)
                                                ├── Investment Service (3003)
                                                ├── Notification Service (3004)
                                                ├── Payment Service (3005)
                                                └── Analytics Service (3006)
```

## 🗄️ Database Schema

### Core Tables
- **users**: ข้อมูลผู้ใช้
- **user_profiles**: โปรไฟล์ผู้ใช้
- **financial_accounts**: บัญชีการเงิน
- **transactions**: ธุรกรรม
- **investments**: การลงทุน
- **financial_goals**: เป้าหมายการเงิน
- **payment_requests**: คำขอชำระเงิน
- **notifications**: การแจ้งเตือน

## 🚀 Development Workflow

### 1. Setup Environment
```bash
# Install dependencies
make install

# Start development services
make docker-dev-up
```

### 2. Development
```bash
# Start all services
make dev

# Start specific service
make dev-frontend
make dev-backend
```

### 3. Testing
```bash
# Run all tests
make test

# Run specific tests
make test-frontend
make test-backend
```

### 4. Building
```bash
# Build all services
make build

# Build specific service
make build-frontend
make build-backend
```

### 5. Production
```bash
# Start production
make start

# Docker deployment
make docker-up
```

## 🔧 Configuration Files

- **Frontend**: `frontend/next.config.js`, `frontend/tailwind.config.js`
- **Backend**: `backend/*/tsconfig.json`, `backend/*/env.example`
- **Database**: `docker/postgres/init.sql`
- **Gateway**: `gateway/krakend.json`
- **Docker**: `docker-compose.yml`, `docker-compose.dev.yml`

## 📱 Frontend Features

- 🌟 Landing Page แบบอวกาศโลกอนาคต
- 🔐 Authentication System
- 💰 Financial Dashboard
- 📊 Investment Portfolio
- 🎯 Financial Goals
- 🤖 AI Advisor
- 📈 Financial Health
- 💳 Payment Management
- 🛡️ Admin Dashboard

## 🔐 Security Features

- JWT Authentication
- Password Hashing
- Rate Limiting
- CORS Protection
- Input Validation
- SQL Injection Protection

## 🎨 UI/UX Theme

- Space/Futuristic Design
- Dark/Light Mode
- Responsive Design
- Smooth Animations
- Glass Morphism Effects
- Neon Glow Effects

## 📊 Monitoring & Health

- Service Health Checks
- Performance Metrics
- Error Tracking
- Structured Logging
- Database Monitoring
- Cache Performance

## 🔄 CI/CD Pipeline

- Automated Testing
- Code Quality Checks
- Docker Image Building
- Automated Deployment
- Environment Management
- Rollback Procedures

