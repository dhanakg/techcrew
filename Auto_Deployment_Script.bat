@echo off
set list=8001 8002
SET premService=C:\Windows\System32\config\systemprofile\AppData\Local\Jenkins\.jenkins\workspace\Q5_Insurance_CI\premium-services
SET paymService=C:\Windows\System32\config\systemprofile\AppData\Local\Jenkins\.jenkins\workspace\Q5_Insurance_CI\payment-services
SET deployRootFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\
SET premDeployFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services
SET paymDeployFolder=D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services

rmdir /Q /S "D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services"
rmdir /Q /S "D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services"
del /F /Q "D:\kgTechCrew\KGTechCrewDeploymentFolder\*.*"

"C:\Program Files\7-Zip\7z.exe" a -tzip %premDeployFolder% %premService%
"C:\Program Files\7-Zip\7z.exe" a -tzip %paymDeployFolder% %paymService%

"C:\Program Files\7-Zip\7z.exe" x -o%deployRootFolder% D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services.zip
"C:\Program Files\7-Zip\7z.exe" x -o%deployRootFolder% D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services.zip

del "D:\kgTechCrew\KGTechCrewDeploymentFolder\premium-services.zip"
del "D:\kgTechCrew\KGTechCrewDeploymentFolder\payment-services.zip"