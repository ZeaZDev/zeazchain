# Global Content Delivery (CDN)

## 1. GameFi Asset Delivery (Unity WebGL)

- Unity WebGL build (ไฟล์ `.wasm`, `.data`, `.js`) ถูกเก็บใน **Amazon S3**
- ใช้ **Amazon CloudFront** หน้าบัคเก็ต
- `GameScreen.tsx` โหลดเกมจาก `https://cdn.zeaz.dev/game/index.html`
- ผลลัพธ์: โหลดเร็วทั่วโลกและลดโหลดให้ API

## 2. API & Edge Caching

- ใช้ **Cloudflare** หรือ **CloudFront** เป็น WAF + CDN ของ API
- ทำหน้าที่:
  - กัน DDoS/SQLi/XSS ก่อนเข้า K8s
  - Cache `GET` ที่ไม่อ่อนไหว (เช่น `GET /api/v1/defi/pools`)
- ต้องมี cache invalidation plan เมื่อข้อมูลสำคัญเปลี่ยน
