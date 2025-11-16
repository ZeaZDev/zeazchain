# Enterprise Infrastructure (Terraform)

## 1. Mandate: Infrastructure as Code

ทุกองค์ประกอบ Cloud (VPC, Cluster, Database) ต้องถูกนิยามและบริหารด้วย **Terraform** เท่านั้น เพื่อความ reproducible และ audit-ready ห้าม click-ops บน console

## 2. Cloud Provider

- เป้าหมายหลัก: **AWS** (บริการจัดการพร้อม HA)
- เป้าหมายสำรอง: **GCP (GKE)**

## 3. VPC & Network Design (Zero Trust)

- 1 VPC ต่อ environment (Staging, Production)
- **Public Subnet:** Load Balancer (ALB/NLB), NAT Gateway เท่านั้น
- **Private Subnet:**
  - `private-app`: โฮสต์ K8s worker nodes และ service pods (ไม่มีทางออก internet ตรง)
  - `private-data`: โฮสต์ RDS (Postgres) และ ElastiCache (Redis)
- **Traffic Flow:**
  - Ingress: User ➜ Cloudflare (WAF) ➜ ALB ➜ K8s Ingress ➜ NestJS pod
  - Egress: Pod ➜ `private-app` ➜ NAT Gateway ➜ Internet (World ID, Bank APIs)
- **Security Groups:**
  - ALB SG เปิด 443 จาก IP Cloudflare
  - App Pod SG รับ 3000 จาก ALB SG
  - Data SG (Postgres) รับ 5432 เฉพาะจาก App Pod SG
