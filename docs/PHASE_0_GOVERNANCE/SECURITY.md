# Enterprise Security Bible (Zero Trust)

## 1. Core Principles

- **Zero Trust:** ไม่เชื่อถือใครทั้งนั้น ต้องยืนยันทุก user/device/service รวมถึง pod-to-pod
- **Principle of Least Privilege:** IAM Role และ Service Account ได้สิทธิ์เท่าที่จำเป็น
- **Defense in Depth:** ป้องกันหลายชั้น (Edge WAF ➜ VPC/Subnet ➜ K8s Policies ➜ App Auth ➜ Data Encryption)

## 2. Secrets Management

- **Mandate:** ทั้งหมดต้องอยู่ใน **HashiCorp Vault**
- **Forbidden:** ห้ามเก็บ secrets ใน `.env`, Git, Docker image หรือ Secret ที่ไม่ได้เข้ารหัส
- **Flow:**
  1. NestJS API pod ใช้ Service Account ที่ auth กับ Vault
  2. Pod ขอ secrets runtime (เช่น `POSTGRES_PASSWORD`)
  3. Secrets มีอายุสั้นและหมุนอัตโนมัติ

## 3. Data Classification & Handling

- **ระดับข้อมูล:** L1–L4 (L4 = Critical PII เช่น KYC, `nullifierHash`)
- **ข้อบังคับ:**
  - L4 ต้องเข้ารหัสที่ rest (TDE หรือ field-level)
  - ทราฟฟิกทั้งหมดต้อง TLS 1.3

## 4. Incident Response Plan (IRP)

1. **Detection:** Alert อัตโนมัติ (Prometheus/Grafana/Loki)
2. **Triage:** On-call ประเมิน severity
3. **Containment:** จำกัดขอบเขต (Network Policy, เพิกถอน IAM)
4. **Eradication:** แก้ช่องโหว่
5. **Recovery:** กู้บริการจาก state ที่เชื่อถือได้
6. **Post-Mortem:** สรุป root cause + เพิ่มการทดสอบ