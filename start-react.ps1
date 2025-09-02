Write-Host "Starting EasyBusy React Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start your React app on http://localhost:4000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Change to the script directory
Set-Location $PSScriptRoot

# Start the React development server
& "C:\Program Files\nodejs\npm.cmd" start
