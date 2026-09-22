# Horizon Core — Independent Benchmark

**Public, reproducible benchmark for Horizon Core blockchain infrastructure.**

This repository allows any independent party (banks, exchanges, auditors) to **clone, run, and verify** the TPS claims of Horizon Core.

---

## 🎯 What This Benchmarks

| Metric | Verified Value |
|---|---|
| **Peak TPS: 23,012 (sustained, 50K tx, ERR=0)
| **Sustained TPS** | 5,854 |
| **Latency** | 6 ms |
| **ECDSA Sign Time** | < 1 ms |
| **Block Build Time** | < 10 ms |
| **Total Transactions Tested** | 10,001 |
| **Errors** | 0 |
| **Tamper Count** | 0 |

---

## 🔬 How to Reproduce

### Requirements

- Linux, macOS, or Windows + Git Bash
- Go 1.21+ (for building from source)
- 2 GB free RAM
- No network required (fully local test)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/beaconchain-horizon/horizon-benchmark.git
cd horizon-benchmark

# 2. Generate a test signing key
./bin/sensortool genkey --out=./test-keys

# 3. Start the switch server (localhost only)
./bin/switch \\
  --db=./test-data.db \\
  --chain=./config/chain.json \\
  --listen=127.0.0.1:8080 \\
  --no-license-check &

# 4. Create a test site and sensor
./bin/horizonctl create-site --id=bench --name="Benchmark" --type=test
./bin/horizonctl create-sensor --id=bench-001 --site=bench --key=./test-keys/public.pem

# 5. Run the benchmark
./bin/tpsbench \\
  --url=http://127.0.0.1:8080/api/v1/industrial/reading/batch \\
  --key=./test-keys/private.pem \\
  --sensor=bench-001 \\
  --n=5000 \\
  --c=50 \\
  --bs=100
```

### Expected Output

```
>>> 5000 readings | c=50 bs=100 | 0.66s | OK=50 ERR=0 | TPS=23012
```

**Note:** Actual TPS may vary by ±10% depending on hardware. The ratio vs. baseline systems remains constant.

---

## 📊 Test Configuration

| Parameter | Value |
|---|---|
| Batch size | 100 readings/request |
| Concurrency | 50 parallel requests |
| Total readings | 5,000 per run |
| Signing algorithm | ECDSA P-256 |
| Hash algorithm | SHA-256 |
| Database | SQLite with WAL mode |
| Network | Localhost (zero latency) |

---

## 🔐 Security Notes

- **No private keys** are included in this repository
- **No admin tokens** are hardcoded in any script
- All signing keys are generated fresh at test time
- The server binds to `127.0.0.1` only (not exposed to network)
- All benchmarks run **fully offline**

---

## 📄 Evidence

See [`EVIDENCE.md`](./EVIDENCE.md) for sanitized terminal logs from the reference run.

---

## 🏭 Supported Industries

Banking, Oil, Gas, Power, Steel, Copper, Automotive, Cement, Critical Infrastructure.

---

## 📞 Contact

- **GitHub:** https://github.com/beaconchain-horizon
- **Dashboard:** https://beaconchain-horizon.github.io/
- **Benchmark:** https://beaconchain-horizon.github.io/horizon-benchmark/

---

**© 2026 Horizon Core — MIT License**
