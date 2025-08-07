@echo off
echo ===============================================
echo Deploying website using WinSCP...
echo ===============================================

echo Creating WinSCP script...
echo open sftp://u681736859:zaq1@Wsx@82.29.189.137:65002 -hostkey=* > winscp_script.txt
echo cd /public_html >> winscp_script.txt
echo put index.html >> winscp_script.txt
echo put styles.css >> winscp_script.txt
echo put app.js >> winscp_script.txt
echo put privacy-policy.html >> winscp_script.txt
echo put profile.jpg >> winscp_script.txt
echo exit >> winscp_script.txt

echo Running WinSCP deployment...
"C:\Users\%USERNAME%\AppData\Local\Programs\WinSCP\WinSCP.com" /script=winscp_script.txt

if %ERRORLEVEL% == 0 (
    echo.
    echo ===============================================
    echo ✓ DEPLOYMENT SUCCESSFUL!
    echo ===============================================
    echo Your website has been updated!
    echo Check: https://lavenderblush-ibex-883889.hostingersite.com/
    echo.
) else (
    echo.
    echo ===============================================
    echo ✗ DEPLOYMENT FAILED
    echo ===============================================
    echo Please try manual upload using WinSCP GUI
)

del winscp_script.txt 2>nul
echo.
pause 