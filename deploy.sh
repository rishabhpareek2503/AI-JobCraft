#!/bin/bash

# JD Assistant - Vercel Deployment Script
echo "🚀 JD Assistant - Vercel Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - JD Assistant"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository found"
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=("package.json" "vercel.json" "frontend/package.json" "backend/package.json" "backend/server.js")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check if API calls use relative paths
echo "🔍 Checking API calls..."
if grep -q "http://localhost:5000" frontend/src/components/JDGenerator.js; then
    echo "❌ Found localhost URLs in frontend. Please update to relative paths."
    exit 1
else
    echo "✅ API calls use relative paths"
fi

# Check if backend exports app
if grep -q "export default app" backend/server.js; then
    echo "✅ Backend exports app for Vercel"
else
    echo "❌ Backend doesn't export app. Please add 'export default app' to server.js"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Your repository is ready for Vercel deployment."
echo ""
echo "📝 Next steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/yourusername/jd-assistant.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Click 'New Project'"
echo "   - Import your GitHub repository"
echo "   - Add environment variable: OPENAI_API_KEY"
echo "   - Deploy!"
echo ""
echo "🌐 Your app will be live at: https://your-project.vercel.app" 