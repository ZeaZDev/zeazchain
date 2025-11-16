# Enterprise CI/CD Pipeline (GitOps)

## 1. Continuous Integration (CI)

- Platform: **GitHub Actions**
- Trigger: `on: pull_request` (ไปยัง `develop` หรือ `main`)
- Workflow:
  1. `pnpm lint` (ESLint + Solhint)
  2. `pnpm test` (Unit/Integration + Hardhat)
  3. Static Analysis: **SonarQube**
  4. `docker build ...` (สร้าง image ของ service ที่เกี่ยวข้อง)
- ขั้นตอนใด fail ➜ PR ถูกบล็อกทันที

## 2. Continuous Delivery (CD)

- Platform: **ArgoCD (GitOps)**
- Trigger: `on: push` (merge เข้า `develop` หรือ `main`)
- Flow:
  1. CI build image, tag เช่น `zeazdev/api-service:v2.1.3-<commitSHA>`
  2. Push image ไป Amazon ECR
  3. Pipeline commit ไป GitOps repo เพื่ออัปเดต `k8s/<service>/deployment.yaml`
  4. ArgoCD ตรวจพบการเปลี่ยนแปลงและ sync ต่อเนื่อง ทำ Rolling Update อัตโนมัติ

## 3. Deployment Strategy

- **Rolling Update:** ค่าเริ่มต้น เสถียรและ zero-downtime
- **Blue/Green:** สำหรับการเปลี่ยนใหญ่ ArgoCD deploy green ควบคู่ blue แล้วตัดสวิตช์ ingress ทันที