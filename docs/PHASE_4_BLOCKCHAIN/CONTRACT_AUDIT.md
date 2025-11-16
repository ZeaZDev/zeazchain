# Smart Contract Security & Audit Lifecycle

## 1. Audit Mandate

- ห้าม deploy mainnet ถ้าไม่ได้ audit จากบริษัทภายนอก (OpenZeppelin, Trail of Bits, ConsenSys Diligence)
- Contract ที่ถือ TVL > $1M ต้อง audit รอบที่สอง

## 2. Pre-Audit Internal Checklist

- [ ] Hardhat tests 100% ครอบคลุม
- [ ] NatSpec ครบทุกฟังก์ชัน
- [ ] ผ่าน `slither .` และ `mythril`
- [ ] Peer review ช่องโหว่หลัก (Re-entrancy, Overflow, Access Control)
- [ ] ทดสอบบน public testnet (Sepolia)

## 3. Post-Audit Remediation

- แก้ไขทุก finding ระดับ Critical/High/Medium
- Low/Info ต้องตอบรับหรือแก้ไข
- เผยแพร่รายงานฉบับสุดท้ายพร้อม remediation ต่อสาธารณะ
