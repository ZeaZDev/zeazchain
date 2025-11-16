# Enterprise Observability (The O11y Stack)

## 1. Metrics (The "What")

- Tech: **Prometheus** + **Grafana**
- แหล่งข้อมูล: K8s API Server, NestJS `/metrics`, Kafka, RDS
- Dashboard เดียวเห็นสุขภาพ API, Cluster, Kafka throughput, FinTech API

## 2. Logging (The "Why")

- Tech: **Grafana Loki** หรือ ELK
- Flow: Pods log JSON ➜ Promtail/Fluentd ➜ Loki
- จุดประสงค์: central log search + ผูกกับ `trace-id`

## 3. Tracing (The "Where")

- Tech: **Jaeger / OpenTelemetry**
- ข้อบังคับ: ทุกคำขอสร้าง `trace-id` และส่งต่อผ่าน API ➜ Kafka ➜ Consumer ➜ DB
- ทำให้ตามรอยได้ end-to-end ในระบบ async

## 4. Alerting

- Tech: **Alertmanager ➜ PagerDuty**
- Mandatory Alerts:
  - `API_ERROR_RATE > 1%`
  - `API_LATENCY_P99 > 1s`
  - `KAFKA_CONSUMER_LAG > 1000`
  - `CERT_EXPIRY < 30d`
