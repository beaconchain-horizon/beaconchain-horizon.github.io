#!/bin/bash
set -e
cd "$(dirname "$0")"
./bin/sensortool genkey --out=test-keys
export SWITCH_DB=bench.db
export CHAIN_CONFIG=config/chain.json
export ADMIN_TOKEN=bench
export GIN_MODE=release
./bin/switch > switch.log 2>&1 &
sleep 4
./bin/tpsbench -url=http://127.0.0.1:8080/api/v1/industrial/reading/batch -key=test-keys/private.pem -sensor=b1 -n=5000 -c=50 -bs=100
kill %1 2>/dev/null || true
