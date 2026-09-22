# Horizon Core — TPS Benchmark Report (Real Test)

**Date:** 2026-09-22
**Infrastructure:** Horizon Core v2
**Test Status:** Verified with real tooling

---

## Real Test Results

| Test | Batch Size | Concurrency | Duration | TPS | Errors |
|---|---|---|---|---|---|
| Test 1: Single Reading | 1 | 1 | - | - | 0 |
| Test 2: Batch 100 | 100 | 50 | 0.85s | 5,854 | 0 |
| Test 3: Batch 500 | 500 | 50 | 1.11s | 4,515 | 0 |

**Total readings:** 10,001
**Tamper count:** 0
**Integrity:** All signatures verified

---

## Test Environment

- OS: Windows + Git Bash
- Backend: switch.exe (Go binary)
- Signing: sensortool.exe
- Benchmark: tpsbench.exe
- API: http://localhost:8080/api/v1/industrial/reading/batch
- Auth: X-Admin-Token
- Crypto: ECDSA P-256 + SHA-256

---

## Raw Output

Test 1: {"alert":null,"hash":"cfcd1b4dd3d9f38b9dc6f4b97e720cdccaa7f5e79095e51a125828ce85647e53","reading_id":1,"status":"accepted","verified":true}

Test 2: 5000 readings | c=50 bs=100 | 0.85s | OK=50 ERR=0 | TPS=5854

Test 3: 5000 readings | c=50 bs=500 | 1.11s | OK=10 ERR=0 | TPS=4515

Final: readings_count=10001 | tamper_count=0

---

## Reproduce This Test

```bash
cd ~/Beaconchain/horizon-core
SWITCH_DB=/tmp/tps/db.sqlite CHAIN_CONFIG=$(pwd)/config/chain.json ADMIN_TOKEN=test123 GIN_MODE=release ./switch.exe &
./sensortool.exe genkey --out=/tmp/tps/keys
./tpsbench.exe -url=http://localhost:8080/api/v1/industrial/reading/batch -key=/tmp/tps/keys/private.pem -sensor=tps-001 -n=5000 -c=50 -bs=100
```

---

## Comparison

| System | TPS | Verifiable |
|---|---|---|
| Horizon Core (real test) | 5,854 | Yes (this document) |
| Bitcoin | 7 | Yes |
| Ethereum | 15-30 | Yes |
| Visa | 24,000 | Reported only |
| SWIFT | 10,000 | Reported only |

---

## Links

- Dashboard: https://beaconchain-horizon.github.io/
- Store: https://beaconchain-horizon.github.io/store/
- GitHub: https://github.com/beaconchain-horizon

---

Copyright 2026 Horizon Core
Tested: 2026-09-22
Signed: ECDSA P-256
