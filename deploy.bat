@echo off
echo Deploying website files to hosting server...

echo Uploading index.html...
scp -P 65002 index.html u681736859@82.29.189.137:/public_html/

echo Uploading styles.css...
scp -P 65002 styles.css u681736859@82.29.189.137:/public_html/

echo Uploading app.js...
scp -P 65002 app.js u681736859@82.29.189.137:/public_html/

echo Uploading privacy-policy.html...
scp -P 65002 privacy-policy.html u681736859@82.29.189.137:/public_html/

echo Uploading profile.jpg...
scp -P 65002 profile.jpg u681736859@82.29.189.137:/public_html/

echo Deployment completed!
pause 