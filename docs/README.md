# ZeaZDev FiGaTect Super-App (Enterprise Edition)

## 1. Project Definition

**ZeaZDev** เป็นแอป "FiGaTect" ระดับ OMEGA-TIER ที่พร้อมผลิตจริงบนหลายแพลตฟอร์มสำหรับภารกิจทางการเงินและเกมที่ต้องการสเกลสูง และถูกออกแบบให้เป็น MiniApp ภายใน World App โดยตรง

สถาปัตยกรรม Enterprise Edition ระบุชัดว่าระบบต้อง Cloud-Native บน **Kubernetes (K8s)**, ปลอดภัยด้วย **HashiCorp Vault**, บริหารโครงสร้างด้วย **Terraform (IaC)** และใช้ **Apache Kafka** เป็นแกน Event-Driven

## 2. Core Enterprise Mandates

1. **OMEGA QUALITY**: โค้ด โครงสร้าง และเอกสารต้องเป็น production-grade ปลอดภัย ตรวจสอบย้อนกลับได้ และสเกลจริง ไม่มี placeholder/demo
2. **ZKP IS THE GATE**: World ID Zero-Knowledge Proofs คือชั้นยืนยันตัวตนหลักสำหรับ use case มูลค่าสูง (FinTech, Rewards, Governance)
3. **ZERO TRUST SECURITY**: ปฏิบัติตาม Zero Trust model ทุกช่องทางเข้าถูกตรวจสอบ สิ่งลับจัดการผ่าน Vault
4. **RESILIENCE & HA**: สถาปัตยกรรม Multi-AZ ใช้ Kafka เพื่อแยกโหลดแบบ async 保證 API เสถียร
5. **AUDIT & COMPLIANCE**: ระบบต้องผ่าน SOC 2 Type 2, ISO 27001 และ Smart Contract Audit

## 3. Enterprise Technology Stack

- Orchestration: Kubernetes (AWS EKS, Google GKE)
- IaC: Terraform
- Backend: NestJS (Node.js)
- Frontend: React Native (Expo)
- Database: PostgreSQL (AWS RDS Multi-AZ)
- Cache: Redis (AWS ElastiCache)
- Event Stream: Apache Kafka (AWS MSK, Confluent)
- Secrets: HashiCorp Vault
- CI/CD: GitHub Actions + ArgoCD
- Observability: Prometheus, Grafana, Jaeger
- Identity: World ID (ZKP)
- Contracts: Solidity (Hardhat)

## 4. Enterprise Architecture Diagram

```mermaid
graph TD
    User[User (World App MiniApp)] --> Edge[Edge: Cloudflare (WAF / CDN)]

    subgraph "Cloud VPC (Private & Public Subnets)"
        Edge -- API Requests --> K8s[Kubernetes Cluster (EKS/GKE)]
        Edge -- Game Assets --> S3[S3 / Object Storage]

        subgraph K8s[Kubernetes Cluster (EKS/GKE)]
            direction LR
            Ingress[ALB / Nginx Ingress] --> API[Backend API Pods (NestJS)<br/>(Auto-Scaled HPA)]

            subgraph "Async Workers"
                direction TB
                Consumer[Game/Reward Consumers (Kafka)]
            end

            API -- Publishes Events --> Kafka[Kafka / Kinesis]
            Kafka --> Consumer
        end

        subgraph "Managed Data Layer (Private Subnet)"
            direction TB
            PG_P[(Postgres Primary (Writes))]
            PG_R[(Postgres Read-Replica)]
            Redis[(ElastiCache / Memorystore)]

            PG_P <--> PG_R

            API --> PG_R
            API --> PG_P
            API --> Redis
            Consumer --> PG_P
        end

        subgraph "Managed Security Layer"
            Vault[HashiCorp Vault<br/>(Secrets Manager)]
            K8s --> Vault
        end
    end

    subgraph "3rd Party APIs (Egress via NAT)"
        K8s --> WID_API[World ID Cloud API]
        K8s --> Bank[Thai Bank API]
        K8s --> Fintech[FinTech Card API]
    end

    subgraph "DevOps & Observability (Monitors VPC)"
        O11y[Observability<br/>(Prometheus, Grafana, Jaeger)]
        GitOps[GitOps: ArgoCD<br/>(Reads from Git)]

        GitOps --> K8s
        O11y <--> K8s
        O11y <--> PG_P
    end
```
