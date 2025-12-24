# Deployment Guide for Vercel

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Choose your account
   - Link to existing project? **No**
   - What's your project's name? **productivity-hub** (or your preferred name)
   - In which directory is your code located? **./**
   
5. Your app will be deployed! Vercel will provide you with a URL like:
   `https://productivity-hub-xxx.vercel.app`

6. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect the settings

3. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live!

### Option 3: Import from Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Vercel will automatically detect the Node.js configuration
6. Click "Deploy"

## Vercel Configuration

The `vercel.json` file is already configured with:
- Node.js runtime for the Express server
- Static file serving from `/public`
- Proper routing for all pages

## Build Settings

Vercel will automatically use these settings:
- **Build Command**: (none needed)
- **Output Directory**: (none - uses Express server)
- **Install Command**: `npm install`
- **Development Command**: `npm start`

## Environment Variables

This application doesn't require any environment variables. All data is stored in the browser's LocalStorage.

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Port Issues
The application uses `process.env.PORT || 3000`. Vercel automatically provides the PORT environment variable.

### 404 Errors
Make sure all routes in `server.js` are properly defined. The current setup handles:
- `/` - Home page
- `/habit-tracker` - Habit Tracker
- `/pomodoro` - Pomodoro Clock
- `/task-manager` - Task Manager

### Build Errors
If you encounter build errors:
1. Ensure `package.json` has the correct Node.js version in engines
2. Check that all dependencies are listed in `package.json`
3. Verify `vercel.json` configuration

## Post-Deployment

After successful deployment:
1. ✅ Test all three pages
2. ✅ Check that navigation works
3. ✅ Verify LocalStorage persistence
4. ✅ Test on mobile devices (responsive design)

## URLs After Deployment

Your deployed app will have these routes:
- `https://your-app.vercel.app/` - Home page
- `https://your-app.vercel.app/habit-tracker` - Habit Tracker
- `https://your-app.vercel.app/pomodoro` - Pomodoro Clock
- `https://your-app.vercel.app/task-manager` - Task Manager

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments
- Automatic HTTPS certificates
- Global CDN distribution

## Support

For issues with Vercel deployment, visit:
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
