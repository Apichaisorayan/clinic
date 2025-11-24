# 🌐 Deployment URLs

## ⏳ รอ Deploy เสร็จก่อน

หลังจาก push code และ GitHub Actions deploy เสร็จ (2-3 นาที)

---

## 📝 ขั้นตอนหา URLs

### 1. ไปที่ Cloudflare Dashboard
👉 https://dash.cloudflare.com

### 2. คลิก "Workers & Pages"

### 3. หา API URL
- หา project ชื่อ **"clinic-booking-api"**
- คลิกเข้าไป
- คัดลอก URL (จะเป็น `https://clinic-booking-api.XXXXXXX.workers.dev`)

### 4. หา Client URL
- หา project ชื่อ **"clinic-booking"**
- คลิกเข้าไป
- คัดลอก URL (จะเป็น `https://clinic-booking.pages.dev`)

---

## 🔧 อัพเดท API URL

### แก้ไขไฟล์: `client/src/config/network.js`

หา บรรทัดนี้:
```javascript
apiBase: 'https://clinic-booking-api.YOUR_SUBDOMAIN.workers.dev/api',
serverUrl: 'https://clinic-booking-api.YOUR_SUBDOMAIN.workers.dev'
```

แทนที่ `YOUR_SUBDOMAIN` ด้วย subdomain จริงที่ได้

ตัวอย่าง:
```javascript
apiBase: 'https://clinic-booking-api.abc123.workers.dev/api',
serverUrl: 'https://clinic-booking-api.abc123.workers.dev'
```

### Commit และ Push

```bash
git add client/src/config/network.js
git commit -m "Update production API URL"
git push origin main
```

GitHub Actions จะ deploy ใหม่อัตโนมัติ!

---

## ✅ URLs ของคุณ

เมื่อ deploy เสร็จแล้ว เขียนไว้ตรงนี้:

**API URL**: `https://clinic-booking-api.____________.workers.dev`

**Client URL**: `https://clinic-booking.pages.dev`

---

## 🎉 เสร็จสิ้น!

เมื่ออัพเดท API URL แล้ว:
1. รอ GitHub Actions deploy เสร็จ (1-2 นาที)
2. เปิด Client URL
3. ระบบพร้อมใช้งาน!

---

## 💡 Tips

- **Custom Domain**: ตั้งค่าได้ใน Cloudflare Dashboard
- **HTTPS**: ใช้ HTTPS อัตโนมัติ (ฟรี SSL)
- **CDN**: รวดเร็วทั่วโลก
- **Auto-deploy**: Push code = Auto deploy

---

## 🐛 Troubleshooting

### ปัญหา: Client ไม่เชื่อมต่อ API
- เช็คว่าอัพเดท API URL ใน `network.js` แล้ว
- เช็ค Console (F12) ดู error
- เช็ค Network tab ว่า request ไปที่ไหน

### ปัญหา: API Error
- เช็คว่า run `npm run db:migrate:prod` แล้ว
- ดู logs: `npx wrangler tail`
- เช็ค environment variables ใน Cloudflare Dashboard

---

มีปัญหา? เปิด Issue ใน GitHub! 🚀
