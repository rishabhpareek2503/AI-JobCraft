# JD Assistant - AI Job Description Generator

A full-stack web application for generating professional job descriptions using OpenAI's GPT-3.5-turbo.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/jd-assistant)

**Note:** You'll need to add your OpenAI API key in the Vercel environment variables after deployment.

## 🚨 Important: API Key Required

**This application requires a valid OpenAI API key to function.** Without a valid API key, the application will not start and will display clear error messages.

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/jd-assistant.git
   cd jd-assistant
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```bash
   cd backend
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   echo "PORT=5000" >> .env
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Start backend
   npm run start
   
   # Terminal 2 - Start frontend
   npm run dev
   ```

5. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🚀 Vercel Deployment

### Automatic Deployment

1. **Fork this repository** to your GitHub account
2. **Click the "Deploy with Vercel" button** above
3. **Add environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. **Deploy!** Your app will be live in minutes

### Manual Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Other
     - Build Command: `npm run build`
     - Output Directory: `frontend/build`
   - Add environment variable: `OPENAI_API_KEY`

3. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

## Features

- **AI-Powered Job Description Generation**: Uses OpenAI GPT-3.5-turbo to create professional job descriptions
- **Smart Skills Suggestions**: AI suggests relevant skills based on job title
- **Customizable Content**: Add company details, location, work mode, and custom skills
- **Job Description Library**: Save and manage generated job descriptions
- **Export Options**: Download as text or HTML files
- **Responsive Design**: Works on desktop and mobile devices

## Error Handling

The application now provides detailed error messages for various scenarios:

- **Missing API Key**: Clear error when no valid OpenAI API key is provided
- **Invalid API Key**: Specific error for invalid API keys
- **API Quota Exceeded**: Notification when OpenAI quota is exceeded
- **Rate Limit Exceeded**: Warning when too many requests are made
- **Network Errors**: Clear communication of connection issues

## API Endpoints

- `POST /api/suggest-skills` - Get AI-suggested skills for a job title
- `POST /api/generate-jd` - Generate a complete job description

## Security Notes

- API keys are validated on server startup
- No fallback templates - application requires valid API key
- Input validation on all endpoints
- Detailed error logging for debugging

## Troubleshooting

### "Valid OpenAI API key is required" Error
- Ensure you have set the `OPENAI_API_KEY` environment variable
- Verify your API key is valid and has sufficient credits
- Check that the `.env` file is in the correct location (backend directory)

### API Quota Exceeded
- Check your OpenAI account for remaining credits
- Consider upgrading your OpenAI plan if needed

### Rate Limit Errors
- Wait a moment and try again
- OpenAI has rate limits based on your account tier

## 📋 Deployment Checklist

Before deploying to Vercel, ensure you have:

- [ ] ✅ Root `package.json` with workspaces configured
- [ ] ✅ `vercel.json` with correct build and route configuration
- [ ] ✅ API calls updated to use relative paths (no localhost)
- [ ] ✅ Backend exports app for Vercel serverless functions
- [ ] ✅ Environment variables ready (OPENAI_API_KEY)
- [ ] ✅ Code pushed to GitHub repository
- [ ] ✅ OpenAI API key with sufficient credits
- [ ] ✅ All dependencies properly listed in package.json files

## 🔧 Vercel-Specific Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify file paths are correct
- Check that `vercel.json` configuration is valid

### API Not Working
- Check environment variables are set in Vercel dashboard
- Verify API routes in `vercel.json`
- Check function logs in Vercel dashboard
- Ensure backend `server.js` exports the app correctly

### Frontend Issues
- Ensure API calls use relative paths (not localhost)
- Check if build directory is correct (`frontend/build`)
- Verify static files are served properly
- Check browser console for CORS errors

### Environment Variables
- Ensure `OPENAI_API_KEY` is set in Vercel dashboard
- Check that environment variable is available in all environments (Production, Preview, Development)
- Verify API key is valid and has sufficient credits
