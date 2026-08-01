@echo off
cd /d "%~dp0"
echo Installiere Abhaengigkeiten...
call npm install
if errorlevel 1 (
    echo Fehler bei npm install. Ist Node.js installiert? https://nodejs.org
    pause
    exit /b 1
)
echo.
echo Baue Produktionsversion...
call npm run build
if errorlevel 1 (
    echo Build fehlgeschlagen.
    pause
    exit /b 1
)
echo.
echo ============================================
echo  Achte unten auf die Zeile "Network:".
echo  Diese Adresse (z.B. http://192.168.x.x:4173)
echo  im Chrome-Browser auf dem Android-Handy oeffnen.
echo  Handy und PC muessen im selben WLAN sein.
echo  Dann: Chrome-Menue (drei Punkte) -^> App installieren
echo ============================================
echo.
call npm run preview -- --host
pause
