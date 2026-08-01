@echo off
cd /d "%~dp0"
echo Installiere Abhaengigkeiten...
call npm install
if errorlevel 1 (
    echo.
    echo Fehler bei npm install. Ist Node.js installiert? https://nodejs.org
    pause
    exit /b 1
)
echo.
echo Starte Wochenplan...
call npm run dev
pause
