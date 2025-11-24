# Clinic Booking API - Cloudflare Workers

API สำหรับระบบจองห้องคลินิก ทำงานบน Cloudflare Workers + D1 + R2

## Setup

### 1. ติดตั้ง dependencies
```bash
cd api-cloudflare
npm install
```

### 2. Login Cloudflare
```bash
npx wrangler login
```

### 3. สร้าง D1 Database
```bash
npx wrangler d1 create clinic-booking-db
```

คัดลอก `database_id` ที่ได้ไปใส่ใน `wrangler.toml`

### 4. สร้าง R2 Bucket (สำหรับเก็บรูปภาพ)
```bash
npx wrangler r2 bucket create clinic-uploads
```

### 5. Run migrations
```bash
npm run db:migrate
```

### 6. Run development server
```bash
npm run dev
```

API จะรันที่ `http://localhost:8787`

## Deploy to Production

### 1. Migrate database
```bash
npm run db:migrate:prod
```

### 2. Deploy
```bash
npm run deploy
```

## API Endpoints

เหมือนกับ API เดิมทุกอย่าง:

- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/users` - ดูรายการผู้ใช้
- `GET /api/rooms` - ดูรายการห้อง
- `POST /api/rooms` - สร้างห้องใหม่
- `PUT /api/rooms/:id` - แก้ไขห้อง
- `DELETE /api/rooms/:id` - ลบห้อง
- `GET /api/bookings` - ดูรายการจอง
- `POST /api/bookings` - สร้างการจองใหม่
- `POST /api/upload/room-image` - อัพโหลดรูปภาพ

## ข้อดี

✅ ฟรี (D1 + R2 มี free tier ดี)
✅ เร็วมาก (edge network ทั่วโลก)
✅ Auto-scaling
✅ ไม่ต้องจัดการ server
✅ SSL/HTTPS ฟรี

## Migration จาก Express

ข้อมูลเดิมใน SQLite สามารถ export แล้ว import เข้า D1 ได้:

```bash
# Export จาก SQLite เดิม
sqlite3 api/prisma/dev.db .dump > data.sql

# Import เข้า D1
npx wrangler d1 execute clinic-booking-db --remote --file=data.sql
```
