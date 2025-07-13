@echo off
echo 🚀 JD Assistant - Vercel Deployment Script
echo ==========================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Initializing...
    git init
    git add .
    git commit -m "Initial commit - JD Assistant"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository found
)

REM Check if all required files exist
echo 📋 Checking required files...

if exist "package.json" (
    echo ✅ package.json exists
) else (
    echo ❌ package.json missing
    exit /b 1
)

if exist "vercel.json" (
    echo ✅ vercel.json exists
) else (
    echo ❌ vercel.json missing
    exit /b 1
)

if exist "frontend\package.json" (
    echo ✅ frontend\package.json exists
) else (
    echo ❌ frontend\package.json missing
    exit /b 1
)

if exist "backend\package.json" (
    echo ✅ backend\package.json exists
) else (
    echo ❌ backend\package.json missing
    exit /b 1
)

if exist "backend\server.js" (
    echo ✅ backend\server.js exists
) else (
    echo ❌ backend\server.js missing
    exit /b 1
)

REM Check if API calls use relative paths
echo 🔍 Checking API calls...
findstr /C:"http://localhost:5000" frontend\src\components\JDGenerator.js >nul 2>&1
if %errorlevel% equ 0 (
    echo ❌ Found localhost URLs in frontend. Please update to relative paths.
    exit /b 1
) else (
    echo ✅ API calls use relative paths
)

REM Check if backend exports app
findstr /C:"export default app" backend\server.js >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend exports app for Vercel
) else (
    echo ❌ Backend doesn't export app. Please add 'export default app' to server.js
    exit /b 1
)

echo.
echo 🎉 All checks passed! Your repository is ready for Vercel deployment.
echo.
echo 📝 Next steps:
echo 1. Push to GitHub:
echo    git remote add origin https://github.com/yourusername/jd-assistant.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 2. Deploy to Vercel:
echo    - Go to https://vercel.com
echo    - Click 'New Project'
echo    - Import your GitHub repository
echo    - Add environment variable: OPENAI_API_KEY
echo    - Deploy!
echo.
echo 🌐 Your app will be live at: https://your-project.vercel.app
pause 