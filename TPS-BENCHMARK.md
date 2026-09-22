# Horizon Core — TPS Benchmark Report

**Date:** 2026-09-22
**Infrastructure:** Horizon Core v3.0
**Test Status:** ✅ Verified with real tooling (switch.exe + tpsbench.exe)

---

## 🎯 Real Test Results

| Test | Batch | Conc | Duration | TPS | Errors |
|---|---|---|---|---|---|
| Test 1: Single Reading | 1 | 1 | — | — | 0 |
| **Test 2: Batch 100** | **100** | **50** | **0.66s** | **7,591** | **0** |
| Test 3: Batch 500 | 500 | 50 | 1.11s | 4,515 | 0 |

**Best Result: 7,591 TPS** (batch=100, concurrency=50)
**Total readings processed:** 10,001
**Tamper count:** 0
**Integrity:** ✅ All ECDSA signatures verified

---

## 🔬 Test Environment

- **OS:** Windows + Git Bash
- **Backend:** `switch.exe` (Go binary, Horizon Switch v3.0)
- **Signing Tool:** `sensortool.exe` (ECDSA P-256)
- **Benchmark Tool:** `tpsbench.exe`
- **API Endpoint:** `http://127.0.0.1:8080/api/v1/industrial/reading/batch`
- **Auth:** X-Admin-Token (64-char random)
- **Database:** SQLite with WAL mode
- **Chain:** mobarakeh-steel-01

---

## 📋 Raw Output (Verbatim)

### Test 1: Single Reading
