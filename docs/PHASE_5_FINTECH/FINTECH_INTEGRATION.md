# FinTech Bridge (Secure Proxy)

## 1. Architectural Pattern

- Frontend MiniApp ไม่เคยติดต่อ FinTech/Bank APIs โดยตรง
- NestJS `api-service` เป็น proxy ที่เชื่อถือได้เท่านั้น

## 2. IP Whitelisting (Egress)

- ทราฟฟิกออกทุกเส้นทางผ่าน NAT Gateway IP เดียว
- ส่ง IP นี้ให้พาร์ทเนอร์ (Stripe, Marqeta, SCB) เพิ่มใน allow-list
- รับประกันว่ามีแต่ backend production ที่เรียก API ได้

## 3. Resilience & Timeouts

- Service เช่น `bank.thai.service.ts` ต้องมี timeout สั้น (3-5s)
- Retry แบบ exponential backoff เฉพาะ call ที่ idempotent
- Circuit breaker ตัดการเรียกเมื่อปลายทางล่ม ป้องกัน cascading failure
