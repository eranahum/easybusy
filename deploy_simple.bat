@echo off
echo ===============================================
echo Deploying website to hosting server...
echo ===============================================

echo.
echo Creating WinSCP deployment script...

echo open sftp://u681736859:zaq1%%2BWsx@82.29.189.137:65002 > deploy_script.txt
echo cd /public_html >> deploy_script.txt
echo put index.html >> deploy_script.txt
echo put styles.css >> deploy_script.txt
echo put app.js >> deploy_script.txt
echo put privacy-policy.html >> deploy_script.txt
echo put profile.jpg >> deploy_script.txt
echo exit >> deploy_script.txt

echo.
echo Files to upload:
echo - index.html
echo - styles.css  
echo - app.js
echo - privacy-policy.html
echo - profile.jpg

echo.
echo ===============================================
echo Manual deployment instructions:
echo ===============================================
echo.
echo 1. Download WinSCP from: https://winscp.net/
echo 2. Install WinSCP
echo 3. Open WinSCP
echo 4. Create new session with these settings:
echo    - Host: 82.29.189.137
echo    - Port: 65002
echo    - User: u681736859
echo    - Password: zaq1@Wsx
echo    - Protocol: SFTP
echo 5. Connect to server
echo 6. Navigate to /public_html folder
echo 7. Upload these files:
echo    * index.html
echo    * styles.css
echo    * app.js  
echo    * privacy-policy.html
echo    * profile.jpg
echo.
echo Your website will be updated at:
echo https://lavenderblush-ibex-883889.hostingersite.com/
echo.
echo ===============================================

del deploy_script.txt 2>nul

pause 