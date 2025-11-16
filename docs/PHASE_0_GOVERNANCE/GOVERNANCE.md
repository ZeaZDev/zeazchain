# OMEGA Project Governance

## 1. OMEGA QUALITY Mandate

OMEGA QUALITY คือมาตรฐานสูงสุด:
- **Production-Grade:** ไม่มี placeholder, demo code หรือ TODO
- **Secure:** โค้ดเขียนแบบ defensive สมมติว่าถูกโจมตีเสมอ
- **Auditable:** ตรวจสอบย้อนกลับได้และมีบันทึก
- **Scalable:** ออกแบบรองรับโหลด 1000x โดยไม่ต้องรื้อใหม่

## 2. Code Ownership & Review

- **ความเป็นเจ้าของ:** โค้ดเป็นของโปรเจ็กต์ ไม่ใช่ของใครคนหนึ่ง
- **กระบวนการรีวิว:** PR ทุกชิ้นต้องมี approval จากวิศวกร OMEGA อย่างน้อย 2 คน
- **Mandates:**
  - Reviewer 1: โฟกัส Security, logic flaw, auth bypass
  - Reviewer 2: โฟกัส Architecture, SOLID/DRY, test coverage
  - **ห้าม self-merge**

## 3. Enterprise Branching Strategy

ใช้ GitFlow อย่างเคร่งครัด:
- `main`: โค้ด production พร้อม tag + audit เท่านั้น (Protected)
- `develop`: สาขา integration สำหรับ release ถัดไป (Protected)
- `feat/<feature-name>`: branch จาก `develop`
- `fix/<bug-name>`: ใช้แก้บักทั่วไปจาก `develop`
- `hotfix/<issue-id>`: branch จาก `main` เมื่อฉุกเฉิน และ merge กลับทั้ง `main` และ `develop`
