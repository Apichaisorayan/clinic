@echo off
echo Starting Clinic Management System (Cloudflare Workers)...
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set LOCAL_IP=%%b
        goto :found
    )
)
:found

echo Your IP Address: %LOCAL_IP%
echo.
echo Starting Cloudflare Workers API...
start "Cloudflare API" cmd /k "cd api-cloudflare && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "cd client && npm run dev -- --host 0.0.0.0"

echo.
echo ========================================
echo   Clinic Management System - LAN Mode
echo ========================================
echo.
echo API Server: http://%LOCAL_IP%:8787
echo Frontend:   http://%LOCAL_IP%:5174
echo.
echo Share these URLs with other computers on your network!
echo.
echo Press any key to exit...
pause > nul