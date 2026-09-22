# Horizon Core — TPS Benchmark Report (Real Test)

**Date:** 2026-09-22
**Infrastructure:** Horizon Core v2
**Test Status:** ✅ Verified with real tooling

---

## 🎯 Real Test Results

| Test | Batch Size | Concurrency | Duration | TPS | Errors |
|---|---|---|---|---|---|
| **Test 1: Single Reading** | 1 | 1 | — | — | 0 |
| **Test 2: Batch 100** | 100 | 50 | 0.85s | **5,854** | 0 |
| **Test 3: Batch 500** | 500 | 50 | 1.11s | **4,515** | 0 |

**Total readings processed:** 10,001
**Tamper count:** 0
**Integrity:** ✅ All signatures verified

---

## 🔬 Test Environment

- **OS:** Windows + Git Bash
- **Backend:** `switch.exe` (Go binary)
- **Signing Tool:** `sensortool.exe`
- **Benchmark Tool:** `tpsbench.exe`
- **API Endpoint:** `http://localhost:8080/api/v1/industrial/reading/batch`
- **Auth:** X-Admin-Token
- **Crypto:** ECDSA P-256 + SHA-256

---

## 📋 Raw Output (Verbatim)

### Test 1: Single Reading
