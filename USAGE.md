# คู่มือการใช้งาน Money Investment System

## 🚀 การเริ่มต้นใช้งาน

### 1. ติดตั้งระบบ
```bash
# รัน setup script
chmod +x setup.sh
./setup.sh

# หรือใช้ make
make install
```

### 2. รันระบบ
```bash
# รันใน development mode
make dev

# หรือรันใน background
make up
```

### 3. เข้าถึงระบบ
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8000
- **Database**: localhost:5432

## 🔐 Mock Users สำหรับทดสอบ

### User Account (ผู้ใช้งานทั่วไป)
- **Email**: `user@example.com`
- **Password**: `user123`
- **Role**: User
- **Plan**: Basic
- **Features**: Dashboard, Financial Health, Goals, Tax Planning

### Admin Account (ผู้ดูแลระบบ)
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: Admin
- **Plan**: Premium
- **Features**: All features + Admin Dashboard

### Trial Account (บัญชีทดลอง)
- **Email**: `trial@example.com`
- **Password**: `trial123`
- **Role**: User
- **Plan**: Free Trial (30 วัน)
- **Features**: Basic Dashboard, Limited Goals

## 📱 หน้าจอหลัก

### 1. Homepage (`/`)
- แนะนำระบบและฟีเจอร์
- แสดงแพคเกจและราคา
- Testimonials จากผู้ใช้งาน
- Call-to-action สำหรับสมัครสมาชิก

### 2. ลงทะเบียน (`/auth/register`)
- ฟอร์มสมัครสมาชิก
- เลือกแพคเกจ
- เริ่มต้นใช้งานฟรี 30 วัน

### 3. เข้าสู่ระบบ (`/auth/login`)
- ฟอร์มล็อกอิน
- ลิงก์ลืมรหัสผ่าน
- Social login (Google, Twitter)

### 4. Dashboard (`/dashboard`)
- **ภาพรวม**: สรุปการเงิน, สุขภาพการเงิน, รายการล่าสุด
- **สุขภาพการเงิน**: รายรับรายจ่าย, งบประมาณรายเดือน
- **การลงทุน**: พอร์ตการลงทุน, ผลตอบแทน
- **เป้าหมาย**: เป้าหมายทางการเงิน, ความคืบหน้า
- **งบประมาณ**: งบประมาณรายเดือน, เป้าหมายการออม
- **โปรไฟล์**: ข้อมูลส่วนตัว, แพคเกจปัจจุบัน

### 5. Admin Dashboard (`/admin`)
- **ภาพรวม**: สถิติผู้ใช้งาน, รายได้, การชำระเงิน
- **จัดการผู้ใช้งาน**: ดู, แก้ไข, ลบผู้ใช้งาน
- **จัดการแพคเกจ**: เพิ่ม, แก้ไข, ลบแพคเกจ
- **การชำระเงิน**: อนุมัติ, ปฏิเสธการชำระเงิน

## 🎯 ฟีเจอร์หลัก

### สำหรับผู้ใช้งานทั่วไป
- ✅ Dashboard สรุปภาพรวม
- ✅ ติดตามรายรับรายจ่าย
- ✅ ตั้งเป้าหมายทางการเงิน
- ✅ วิเคราะห์สุขภาพทางการเงิน
- ✅ วางแผนภาษี (Basic/Premium)
- ✅ การลงทุน (Premium)
- ✅ ที่ปรึกษาการเงิน (Premium)

### สำหรับ Admin
- ✅ Dashboard ภาพรวม
- ✅ จัดการผู้ใช้งาน
- ✅ จัดการแพคเกจ
- ✅ อนุมัติการชำระเงิน
- ✅ ดูสถิติระบบ

## 💰 แพคเกจ

### Free Trial (ฟรี 30 วัน)
- Dashboard พื้นฐาน
- ติดตามรายรับรายจ่าย
- เป้าหมายทางการเงิน 3 รายการ
- อีเมลแจ้งเตือน
- รายงานพื้นฐาน

### Basic (฿299/เดือน)
- ทุกฟีเจอร์ใน Free Trial
- วิเคราะห์สุขภาพทางการเงิน
- เป้าหมายทางการเงินไม่จำกัด
- แผนภาษีพื้นฐาน
- รายงานการวิเคราะห์
- แจ้งเตือน SMS

### Premium (฿599/เดือน)
- ทุกฟีเจอร์ใน Basic
- การลงทุนขั้นสูง
- แผนภาษีขั้นสูง
- ที่ปรึกษาการเงินส่วนตัว
- Dashboard แบบ Custom
- Support 24/7

## 🔧 คำสั่งที่ใช้งานได้

```bash
# แสดงคำสั่งทั้งหมด
make help

# ติดตั้ง dependencies
make install

# รันระบบใน development mode
make dev

# Build Docker images
make build

# รันระบบใน background
make up

# หยุดระบบ
make down

# ลบ containers และ volumes
make clean

# แสดง logs
make logs

# รัน tests
make test

# รีเซ็ตฐานข้อมูล
make db-reset

# รัน Frontend development server
make frontend-dev

# รัน Backend development servers
make backend-dev
```

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# รันระบบ
docker-compose up

# รันใน background
docker-compose up -d

# หยุดระบบ
docker-compose down

# รีเซ็ตฐานข้อมูล
docker-compose down -v
docker-compose up -d postgres
```

## 📊 การทดสอบระบบ

### 1. ทดสอบการลงทะเบียน
1. ไปที่หน้า `/auth/register`
2. กรอกข้อมูลและเลือกแพคเกจ
3. กด "สร้างบัญชี"
4. ระบบจะ redirect ไปที่ dashboard

### 2. ทดสอบการเข้าสู่ระบบ
1. ไปที่หน้า `/auth/login`
2. ใช้ mock credentials ที่ให้ไว้
3. ระบบจะ redirect ตาม role:
   - User → `/dashboard`
   - Admin → `/admin`

### 3. ทดสอบฟีเจอร์ต่างๆ
- ทดสอบ Dashboard tabs
- ทดสอบการเพิ่มข้อมูล
- ทดสอบการดูรายงาน
- ทดสอบการตั้งค่า

## 🚨 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

#### 1. npm install error
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

#### 2. Docker connection error
```bash
# รีสตาร์ท Docker
docker-compose down
docker-compose up -d
```

#### 3. Database connection error
```bash
# รีเซ็ตฐานข้อมูล
make db-reset
```

#### 4. Port already in use
```bash
# ดู process ที่ใช้ port
lsof -i :3000
lsof -i :8000

# Kill process
kill -9 <PID>
```

## 📝 การพัฒนาต่อ

### 1. เพิ่มฟีเจอร์ใหม่
- สร้าง component ใน `frontend/src/components/`
- เพิ่ม route ใน `frontend/src/app/`
- อัปเดต navigation และ menu

### 2. แก้ไข Backend
- แก้ไข service ใน `backend/[service-name]/`
- อัปเดต API endpoints
- เพิ่ม business logic

### 3. อัปเดต Database
- แก้ไข schema ใน `database/init.sql`
- รัน migration
- อัปเดต mock data

## 🔗 ลิงก์ที่สำคัญ

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8000
- **Database**: localhost:5432
- **Redis**: localhost:6379
- **Documentation**: README.md
- **Backend Docs**: backend/README.md

## 📞 การสนับสนุน

หากมีปัญหาหรือคำถาม สามารถ:
1. ดู error logs ด้วย `make logs`
2. ตรวจสอบ documentation
3. รีเซ็ตระบบด้วย `make clean && make dev`
4. ติดต่อทีมพัฒนา
