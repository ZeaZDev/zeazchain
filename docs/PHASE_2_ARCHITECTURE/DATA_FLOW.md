# Enterprise Data & Event Architecture

## 1. Database (High Availability)

- **Amazon RDS for PostgreSQL** (Multi-AZ)
- Primary: handle writes (`INSERT/UPDATE/DELETE`)
- Read Replica: บริการ read-heavy `SELECT` (balances, history)
- Backups: PITR 30 วัน

## 2. Cache (Performance)

- **Amazon ElastiCache for Redis** สำหรับ:
  - Session / ZKP-JWT validation
  - DeFi swap quotes
  - Rate limiting counter
  - GameFi leaderboards

## 3. Event-Driven Flow (Kafka)

Use case: Game slot spin

1. User เรียก `POST /api/v1/game/slots/play`
2. `game-service` ตรวจ JWT + balance และประมวลผล RNG
3. Publish message ไป `game_sessions` topic (JSON/ProtoBuf)
4. ตอบ HTTP 200 กลับทันที (payload win/loss)
5. `game-consumer` อ่าน message แล้ว insert DB แยกภายหลัง

**ประโยชน์:** response < 50ms แม้ write DB จะช้า 500ms API ไม่โดนบล็อก
