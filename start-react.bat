@echo off
echo Starting EasyBusy React Development Server...
echo.
echo This will start your React app on http://localhost:4000
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
"C:\Program Files\nodejs\npm.cmd" start

pause
