#!/usr/bin/env pwsh

Write-Host "Starting deployment to hosting server..." -ForegroundColor Green

# Define connection details
$server = "82.29.189.137"
$port = "65002"
$username = "u681736859"
$password = "zaq1@Wsx"
$remotePath = "/public_html"

# Files to deploy
$files = @(
    "index.html",
    "styles.css",
    "app.js",
    "privacy-policy.html",
    "profile.jpg"
)

Write-Host "Uploading files to $server..." -ForegroundColor Yellow

# Upload each file using pscp (if available) or scp
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Uploading $file..." -ForegroundColor Cyan
        
        # Try using scp command
        $scpCommand = "scp -P $port -o StrictHostKeyChecking=no `"$file`" ${username}@${server}:${remotePath}/"
        
        # Create expect script for password automation
        $expectScript = @"
spawn scp -P $port -o StrictHostKeyChecking=no "$file" ${username}@${server}:${remotePath}/
expect "password:"
send "$password\r"
expect eof
"@
        
        # Save expect script to temp file
        $tempScript = [System.IO.Path]::GetTempFileName() + ".exp"
        $expectScript | Out-File -FilePath $tempScript -Encoding ASCII
        
        # Try to run with expect (if available)
        try {
            & expect $tempScript
            Write-Host "✓ $file uploaded successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Failed to upload $file : $_" -ForegroundColor Red
        }
        finally {
            Remove-Item $tempScript -ErrorAction SilentlyContinue
        }
    }
    else {
        Write-Host "✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Your website should now be updated at: https://lavenderblush-ibex-883889.hostingersite.com/" -ForegroundColor Magenta
