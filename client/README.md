# ระบบจองห้องทำงานคลินิก (Clinic Room Booking Dashboard)

Dashboard สำหรับจัดการการจองห้องทำงานในคลินิก ออกแบบด้วย Vue.js, Tailwind CSS และ Vite

## คุณสมบัติ

- 📊 Dashboard แสดงสถิติห้องทำงาน (การจองทั้งหมด, ห้องว่าง, การตรวจวันนี้, รอยืนยัน)
- 🏥 แสดงรายการห้องทำงานพร้อมสถานะแบบ real-time
- 📋 รายการจองล่าสุดพร้อม tabs กรอง (ทั้งหมด, รอยืนยัน, ยืนยันแล้ว)
- 🎨 UI สวยงาม โทนสีฟ้า-เขียว (Cyan/Teal) สไตล์ Modern Minimal
- 📱 Responsive Design
- 🔍 ค้นหาห้อง
- 🔔 แจ้งเตือน

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build
```

## เทคโนโลยีที่ใช้

- Vue.js 3 (Composition API)
- Tailwind CSS
- Vite
- Lucide Icons (SVG Icons)

## โครงสร้างโปรเจกต์

```
client/
├── public/
├── src/
│   ├── App.vue          # Main component
│   ├── main.js          # Entry point
│   └── style.css        # Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```
