# ZeaZDev Dual Tokenomics

ZeaZDev ใช้โมเดลโทเค็น 2 ชนิดเพื่อแยก Governance value ออกจาก utility ภายในเกม

## 1. $ZEA (ZeaToken)

- Contract: `ZeaToken.sol`
- ประเภท: ERC20 (Fixed supply 1 พันล้านโทเค็น)
- Chain: Ethereum Mainnet หรือ L2 (Optimism/Base)
- บทบาท:
  1. Governance voting
  2. โทเค็น staking (ล็อกเพื่อรับ $ZEAZ)
  3. รับค่าธรรมเนียม buy-back/burn หรือกระจายให้ staker
  4. Airdrop ให้ผู้ใช้ที่ผ่าน ZKP

## 2. $ZEAZ (ZeaZToken)

- Contract: `ZeaZToken.sol`
- ประเภท: ERC20 Mintable/Burnable/Pausable (อัตรายืดหยุ่น)
- Chain: L2 หรือ off-chain ledger
- บทบาท:
  1. รางวัลหลักจากการ stake $ZEA
  2. สกุลเงินใช้เล่น GameFi
  3. Daily rewards สำหรับผู้ใช้ที่ผ่าน ZKP

### Economic Loop

- **Mint:** มาจาก `ZeaZStake` และ `ZeaZRewards`
- **Burn:** 100% ของ $ZEAZ ที่ใช้ใน GameFi ถูก burn เพื่อลดเงินเฟ้อ
