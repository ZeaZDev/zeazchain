# Orchestration (Kubernetes)

## 1. Cluster Specification

- บริการหลัก: **AWS EKS** (Managed Control Plane)
- Worker Nodes: Managed Node Groups (EC2)

## 2. Node Pool Strategy

- `app_pool`: t3/m5 สำหรับ NestJS API + Autoscaler
- `data_pool`: r5/c5 สำหรับ Kafka consumers / data jobs
- `cache_pool` (optional): โหนด taint สำหรับ Redis ในคลัสเตอร์

## 3. Scaling Strategy

- **HPA:** API pods (min 3, max 50) ขยายเมื่อ CPU เฉลี่ย > 75%
- **Cluster Autoscaler:** เพิ่ม EC2 node ใน `app_pool` เมื่อ HPA ต้องการ pod มากกว่าทรัพยากรที่มี

## 4. Network Security

- **Ingress:** AWS Load Balancer Controller ➜ ALB ➜ Nginx Ingress
- **Calico Network Policies:** `default-deny`
  - `api-pods` อนุญาต egress ไป `postgres` (5432), `redis` (6379), CoreDNS, Kafka
  - `postgres-pods` ห้าม egress ออกนอก subnet
