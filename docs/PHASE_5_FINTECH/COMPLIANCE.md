# Regulatory Compliance Framework

## 1. Target Frameworks

- **SOC 2 Type 2** (Security, Availability, Confidentiality)
- **ISO 27001** (Information Security Management)
- **GDPR / PDPA** (Data privacy)

## 2. PII Data Handling

- L4 PII (Legal Name, Address) ต้องเข้ารหัสใน Postgres
- Access production DB ถูกห้าม ต้องผ่าน internal tools + least privilege IAM
- ต้องมี process สำหรับคำร้องลบข้อมูล (GDPR/PDPA)

## 3. Audit Trail

- กิจกรรมสำคัญ (Admin login, DB change, FinTech API call) ต้องถูก log ในระบบที่เปลี่ยนแปลงไม่ได้ (AWS CloudTrail หรือ Loki stream เฉพาะ)
- Log เหล่านี้ใช้เป็นหลักฐาน SOC 2
