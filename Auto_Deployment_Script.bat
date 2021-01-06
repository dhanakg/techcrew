@echo off
set list=8001 8002
SET premService=C:\Windows\System32\config\systemprofile\AppData\Local\Jenkins\.jenkins\workspace\Q5_Payment_Service_CI\premium-services
SET paymService=C:\Windows\System32\config\systemprofile\AppData\Local\Jenkins\.jenkins\workspace\Q5_Payment_Service_CI\payment-services
SET deployRootFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\
SET premDeployFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services
SET paymDeployFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services

for %%a in (%list%) do GOTO=%%a
:8001
netstat -o -n -a | findstr %%a
 if %ERRORLEVEL% equ 0 goto FOUND
 echo port not found
 goto FIN
 :FOUND
 echo port found
 :FIN
:8002
netstat -o -n -a | findstr %%a
 if %ERRORLEVEL% equ 0 goto FOUND
 echo port not found
 goto FIN
 :FOUND
 echo port found
 :FIN
:End


rmdir /Q /S "D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services"
rmdir /Q /S "D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services"

"C:\Program Files\7-Zip\7z.exe" a -tzip %premDeployFolder% %premService%
"C:\Program Files\7-Zip\7z.exe" a -tzip %paymDeployFolder% %paymService%

"C:\Program Files\7-Zip\7z.exe" x -o%deployRootFolder% D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services.zip
"C:\Program Files\7-Zip\7z.exe" x -o%deployRootFolder% D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services.zip

del "D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services.zip"
del "D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services.zip"
