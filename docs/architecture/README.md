# 🏗️ Money App - Architecture Documentation

## 📋 ภาพรวมระบบ

Money App เป็นระบบการเงินการลงทุนที่ออกแบบด้วย Clean Architecture และ Microservices Pattern โดยใช้เทคโนโลยีล่าสุดและธีมอวกาศโลกอนาคต

## 🏛️ Clean Architecture

ระบบใช้ Clean Architecture แยกเป็น 3 ชั้นหลัก:

### 1. **Entities Layer** (ชั้นข้อมูล)
- ข้อมูลหลักของระบบ เช่น User, Transaction, Investment
- ไม่ขึ้นกับเทคโนโลยีหรือ framework ใดๆ
- ประกอบด้วย business rules และ validation

### 2. **Use Cases Layer** (ชั้นการทำงาน)
- Business logic และ application rules
- จัดการการทำงานระหว่าง entities
- ไม่ขึ้นกับ UI หรือ database

### 3. **Interface Adapters Layer** (ชั้นเชื่อมต่อ)
- Controllers, Presenters, Gateways
- แปลงข้อมูลระหว่าง use cases และ external systems
- จัดการ HTTP requests, database operations

### 4. **Frameworks & Drivers Layer** (ชั้นเทคโนโลยี)
- Web frameworks, databases, external services
- UI, database drivers, file systems

## 🏢 Microservices Architecture

ระบบแบ่งเป็น microservices หลัก 6 ตัว:

### 1. **User Service** (Port: 3001)
- จัดการผู้ใช้และ Authentication
- User registration, login, profile management
- JWT token management
- Email verification

### 2. **Financial Service** (Port: 3002)
- จัดการรายรับ-รายจ่าย
- Transaction management
- Budget tracking
- Financial accounts

### 3. **Investment Service** (Port: 3003)
- จัดการการลงทุนและพอร์ต
- Portfolio management
- Investment tracking
- Asset allocation

### 4. **Notification Service** (Port: 3004)
- จัดการการแจ้งเตือน
- Push notifications
- Email notifications
- In-app notifications

### 5. **Payment Service** (Port: 3005)
- จัดการการชำระเงิน
- Payment processing
- Subscription management
- Payment verification

### 6. **Analytics Service** (Port: 3006)
- จัดการรายงานและวิเคราะห์
- Financial reports
- Investment analytics
- Performance metrics

## 🌐 API Gateway (KrakenD)

- **Port**: 8080
- จัดการ routing และ load balancing
- Authentication และ authorization
- Rate limiting และ caching
- CORS และ security headers

## 🗄️ Database Architecture

### PostgreSQL Database
- **Port**: 5432
- ใช้ UUID เป็น primary keys
- Encrypted passwords ด้วย pgcrypto
- Automatic timestamp updates
- Proper indexing สำหรับ performance

### Redis Cache
- **Port**: 6379
- Session storage
- API response caching
- Rate limiting data

## 🎨 Frontend Architecture

### Next.js 14
- **Port**: 3000
- App Router และ Server Components
- TypeScript support
- Tailwind CSS สำหรับ styling
- HeroUI components

### Theme System
- Space/Futuristic design
- Dark/Light mode support
- Responsive design
- Smooth animations

## 🔐 Security Features

- JWT-based authentication
- Password hashing ด้วย bcrypt
- Rate limiting
- CORS protection
- Input validation ด้วย Zod
- SQL injection protection

## 📱 Responsive Design

- Mobile-first approach
- Progressive Web App (PWA) features
- Touch-friendly interfaces
- Adaptive layouts

## 🧪 Testing Strategy

- Unit tests สำหรับ business logic
- Integration tests สำหรับ APIs
- E2E tests สำหรับ user flows
- Test coverage > 70%

## 🚀 Deployment

### Development
```bash
# Start development environment
make dev

# Start only database services
make docker-dev-up
```

### Production
```bash
# Build all services
make build

# Start production environment
make start
```

## 📊 Monitoring & Logging

- Structured logging
- Performance metrics
- Error tracking
- Health checks

## 🔄 CI/CD Pipeline

- Automated testing
- Code quality checks
- Docker image building
- Automated deployment

## 📈 Scalability

- Horizontal scaling ของ microservices
- Database connection pooling
- Redis clustering
- Load balancing

## 🛡️ Disaster Recovery

- Database backups
- Service redundancy
- Graceful degradation
- Data recovery procedures
