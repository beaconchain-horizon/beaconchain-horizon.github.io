#!/usr/bin/env bash
# Horizon Core — Reproducible Benchmark
set -uo pipefail

echo "════════════════════════════════════════════"
echo "  Horizon Core — Reproducible Benchmark"
echo "════════════════════════════════════════════"
echo ""

# Check binaries
for bin in switch sensortool horizonctl tpsbench; do
  if [ ! -f "./bin/$bin" ] && [ ! -f "./bin/$bin.exe" ]; then
    echo "Error: missing ./bin/$bin"
    echo "Build from source: make build"
    exit 1
  fi
done

# Generate fresh signing key
echo "[1/4] Generating signing key..."
./bin/sensortool genkey --out=./test-keys 2>/dev/null || ./bin/sensortool.exe genkey --out=./test-keys
echo ""

# Start server
echo "[2/4] Starting server on 127.0.0.1:8080..."
rm -f ./test-data.db
./bin/switch --db=./test-data.db --listen=127.0.0.1:8080 --no-license-check &
SERVER_PID=$!
sleep 3
echo ""

# Setup
echo "[3/4] Setting up test site and sensor..."
./bin/horizonctl create-site --id=bench --name="Benchmark" --type=test 2>/dev/null
./bin/horizonctl create-sensor --id=bench-001 --site=bench --key=./test-keys/public.pem 2>/dev/null
echo ""

# Run benchmark
echo "[4/4] Running benchmark..."
echo ""
./bin/tpsbench --url=http://127.0.0.1:8080/api/v1/industrial/reading/batch --key=./test-keys/private.pem --sensor=bench-001 --n=5000 --c=50 --bs=100

echo ""
# Cleanup
kill $SERVER_PID 2>/dev/null
echo "Benchmark complete."
