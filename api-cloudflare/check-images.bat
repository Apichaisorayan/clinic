@echo off
echo Checking images in database...
echo.

npx wrangler d1 execute clinic-booking-db --local --command="SELECT id, name, image FROM rooms WHERE image IS NOT NULL"

echo.
pause
