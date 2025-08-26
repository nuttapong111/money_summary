# 🚀 Money App - ระบบการเงินการลงทุนอวกาศโลกอนาคต

ระบบการเงินการลงทุนที่ออกแบบด้วยธีมอวกาศโลกอนาคต ใช้เทคโนโลยีล่าสุดและ Clean Architecture

## 🏗️ โครงสร้างโปรเจกต์

```
money_app/
├── frontend/                 # Next.js Frontend
├── backend/                  # Microservices Backend
├── gateway/                  # KrakenD API Gateway
├── shared/                   # Shared Libraries
├── docker/                   # Docker Configuration
├── docs/                     # Documentation
└── scripts/                  # Utility Scripts
```

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + HeroUI
- **Backend**: Node.js + Hono + Clean Architecture
- **API Gateway**: KrakenD
- **Database**: PostgreSQL
- **Notifications**: SweetAlert2
- **UI Theme**: Space/Futuristic Design

## 🚀 การติดตั้ง

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd money_app

# Install dependencies
npm run install:all

# Start development environment
npm run dev:all
```

## 📱 ฟีเจอร์หลัก

- 🌟 Landing Page แบบอวกาศโลกอนาคต
- 🔐 ระบบ Authentication ที่ปลอดภัย
- 💰 จัดการรายรับ-รายจ่าย
- 📊 พอร์ตการลงทุนและวิเคราะห์
- 🎯 เป้าหมายการเงินและการวางแผน
- 🤖 AI Advisor สำหรับคำแนะนำการลงทุน
- 📈 สุขภาพการเงินและการวิเคราะห์
- 💳 จัดการหนี้สินและสินเชื่อ
- 🛡️ Admin Dashboard สำหรับผู้ดูแลระบบ

## 🏛️ Clean Architecture

ระบบใช้ Clean Architecture แยกเป็น Microservices:

- **User Service**: จัดการผู้ใช้และ Authentication
- **Financial Service**: จัดการข้อมูลการเงิน
- **Investment Service**: จัดการการลงทุนและพอร์ต
- **Notification Service**: จัดการการแจ้งเตือน
- **Payment Service**: จัดการการชำระเงิน
- **Analytics Service**: จัดการรายงานและวิเคราะห์

## 🎨 UI/UX Theme

- **Space/Futuristic Design**: ใช้สีเข้ม, เอฟเฟกต์แสง, และไอคอนอวกาศ
- **Responsive Design**: รองรับทุกอุปกรณ์
- **Dark/Light Mode**: สลับธีมได้
- **Smooth Animations**: การเคลื่อนไหวที่ลื่นไหล

## 📄 License

MIT License
