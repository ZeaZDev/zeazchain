# Enterprise Service Architecture

## 1. Service Decomposition

Monolith `apps/backend` ถูกแยกเป็นบริการเฉพาะทางใน K8s:
- `api-service`: NestJS API สำหรับ auth/fintech/wallet (sync)
- `game-service`: NestJS API high-throughput (GameFi) แยกด้วย Kafka
- `reward-consumer`: NestJS worker อ่าน topic `rewards`
- `game-consumer`: NestJS worker อ่าน topic `game_sessions`

## 2. API Gateway & Ingress

- ใช้ **Nginx Ingress Controller** เป็น single entry point หลัง ALB
- Routing:
  - `zeaz.dev/api/v1/auth/*` ➜ `api-service`
  - `zeaz.dev/api/v1/fintech/*` ➜ `api-service`
  - `zeaz.dev/api/v1/game/*` ➜ `game-service`
- จัดการ TLS termination, rate limiting, request log

## 3. Service-to-Service Communication

- **Sync:** ห้าม pod-to-pod โดยตรง ต้องผ่าน Ingress หรือ service mesh (mTLS)
- **Async:** ทุกเหตุการณ์ผ่าน **Kafka** เท่านั้น

## 4. Architecture Diagram

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
    end
```
