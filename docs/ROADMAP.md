# Enterprise Project Roadmap (v2.0)

แผนงานนี้ครอบคลุมการย้ายจากสภาพแวดล้อม v1.0 (Docker Compose) ไปยังสถาปัตยกรรม Enterprise v2.0 (Kubernetes)

## Phase 1: Enterprise Foundation (IaC & Security)
- กำหนดโครงสร้าง Cloud ทั้งหมดด้วย **Terraform**
- สร้าง VPC (Private/Public Subnets) และ NAT Gateways
- ติดตั้ง Kubernetes Cluster (EKS/GKE)
- ติดตั้งและคอนฟิก **HashiCorp Vault**
- สร้าง GitOps repo และติดตั้ง **ArgoCD**
- กำหนด K8s Network Policies (Zero Trust)
- **Milestone:** Cluster ที่ปลอดภัยพร้อมใช้งาน

## Phase 2: Core Service Migration & HA
- ติดตั้ง **Amazon RDS (Postgres) Multi-AZ**
- ติดตั้ง **Amazon ElastiCache (Redis)**
- migrate `schema.prisma` ไปยัง RDS ใหม่
- คอนเทนเนอร์ `apps/backend` และดึง secrets จาก Vault
- Deploy NestJS API ไปยัง K8s ผ่าน ArgoCD
- ตั้งค่า Ingress Controller + WAF
- ตั้งค่า HPA สำหรับ API
- **Milestone:** API หลักทำงานบน K8s ด้วย HA

## Phase 3: Event-Driven Refactor (Kafka)
- ติดตั้ง **Apache Kafka** (MSK/Confluent)
- Refactor endpoints ที่ throughput สูง (`/game/slots/play`, `/rewards/claim`)
- API publish events (เช่น `game_session_played`) ไปยัง Kafka
- สร้าง Kafka Consumer services (NestJS workers) สำหรับประมวลผลและเขียน DB แบบ async
- **Milestone:** ลด latency และ decouple กับ DB

## Phase 4: FinTech, GameFi & Global Delivery
- ใช้ **Amazon S3 / CloudFront** สำหรับ Unity WebGL assets
- ปรับ `GameScreen.tsx` ให้โหลดจาก CDN
- Secured egress ของ FinTech/Bank APIs ผ่าน NAT IP เดียว + IP Whitelisting
- **Milestone:** โหลดเกมเร็วระดับโลกและสะพาน FinTech ปลอดภัยเต็มรูปแบบ

## Phase 5: Observability & Audit
- ติดตั้ง **Prometheus, Grafana, Jaeger**
- Instrument NestJS API ด้วย OpenTelemetry
- กำหนด SLO/SLI + Alerting (Alertmanager/PagerDuty)
- จัดจ้าง Audit ภายนอกสำหรับ Smart Contracts และ Cloud PenTest
- เริ่มเก็บหลักฐาน SOC 2 Type 2
- **Milestone:** ระบบพร้อมตรวจสอบและป้องกันครบวงจร

## Phase 6: Mainnet Launch
- ดำเนินพิธีการย้ายระบบและเปิดจริง
