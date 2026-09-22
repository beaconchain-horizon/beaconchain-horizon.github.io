@echo off
echo === Horizon Benchmark ===
cd /d "%%~dp0"
bin\sensortool.exe genkey --out=test-keys
set SWITCH_DB=bench.db
set CHAIN_CONFIG=config\chain.json
set ADMIN_TOKEN=bench
set GIN_MODE=release
start /B bin\switch.exe > switch.log 2>&1
timeout /t 4 /nobreak > nul
bin\tpsbench.exe -url=http://127.0.0.1:8080/api/v1/industrial/reading/batch -key=test-keys/private.pem -sensor=b1 -n=5000 -c=50 -bs=100
taskkill /F /IM switch.exe > nul 2>&1
pause
