# 🚀 Quick Deploy Guide

## ปัญหาที่เจอ: Project not found

Cloudflare Pages project ยังไม่มี ต้องสร้างครั้งแรกด้วยมือ

---

## ✅ วิธีแก้ (เลือก 1 ใน 2)

### วิธีที่ 1: Deploy ด้วยมือครั้งแรก (แนะนำ - ง่ายที่สุด)

```bash
# 1. Build client
cd client
npm run build

# 2. Deploy ครั้งแรก (จะสร้าง project ให้)
npx wrangler pages deploy dist --project-name=clinic-booking

# 3. เสร็จ! ครั้งต่อไป GitHub Actions จะ deploy ให้อัตโนมัติ
```

---

### วิธีที่ 2: สร้าง Project ผ่าน Dashboard

1. ไปที่: https://dash.cloudflare.com
2. คลิก **Workers & Pages** > **Create application**
3. เลือก **Pages** > **Connect to Git**
4. เลือก repository: **Apichaisorayan/clinic**
5. ตั้งค่า:
   - **Project name**: `clinic-booking`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `client`
6. คลิก **Save and Deploy**

---

## 🎯 หลังจากนั้น

GitHub Actions จะ deploy ให้อัตโนมัติทุกครั้งที่ push!

---

## 📝 สรุปสิ่งที่ทำเสร็จแล้ว

✅ Push code ขึ้น GitHub
✅ ตั้งค่า GitHub Secrets
✅ API deploy สำเร็จแล้ว (clinic-booking-api)
⏳ Client รอ deploy ครั้งแรก

---

## 🌐 URLs ที่ได้

**API**: https://clinic-booking-api.YOUR_SUBDOMAIN.workers.dev
**Client**: รอ deploy เสร็จ

---

## 💤 พรุ่งนี้ทำ:

1. เลือกวิธีที่ 1 หรือ 2 ข้างบน
2. Deploy client ครั้งแรก
3. เอา API URL ไปใส่ใน `client/src/config/network.js`
4. Push อีกครั้ง
5. เสร็จ! 🎉

---

ราตรีสวัสดิ์! 😴
