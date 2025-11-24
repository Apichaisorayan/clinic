@echo off
echo Setting up D1 Database...
echo.

npx wrangler d1 execute clinic-booking-db --local --file=drizzle/0000_initial.sql

echo.
echo Database setup complete!
pause
