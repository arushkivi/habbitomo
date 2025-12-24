# Vercel Deployment Guide

## 🚀 Deploy Your App to Vercel in 5 Minutes

Vercel is perfect for your app - it's free, fast, and automatic!

---

## 📋 Prerequisites

- ✅ GitHub/GitLab/Bitbucket account (free)
- ✅ Vercel account (free) - sign up at https://vercel.com

---

## 🎯 Method 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - HabitKit Productivity App"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/habitkit.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Vercel auto-detects Node.js settings ✅
5. Click "Deploy"

**That's it!** Your app will be live in 2-3 minutes.

### Step 3: Get Your URL

After deployment:
- **Production URL**: `https://your-app.vercel.app`
- **Custom Domain**: Add in project settings (optional)

---

## 🎯 Method 2: Deploy via Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy

```bash
# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

**Prompts:**
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- What's your project's name? **habitkit**
- In which directory is your code? **.**
- Want to override settings? **No**

Done! Your app is live.

---

## 🎯 Method 3: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Drag and drop your project folder
4. Click "Deploy"

---

## ⚙️ Vercel Configuration

Your `vercel.json` is already configured:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/public/(.*)",
      "dest": "/public/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

This ensures:
- ✅ Express server runs properly
- ✅ Static files are served
- ✅ All routes work correctly
- ✅ PWA features work

---

## 🔄 Automatic Deployments

After initial setup:
- **Every push to `main`** = Production deployment
- **Pull requests** = Preview deployments
- **Instant rollbacks** if needed

---

## 🌐 Custom Domain (Optional)

### Add Your Domain:

1. Go to project settings on Vercel
2. Click "Domains"
3. Add your domain: `habitkit.com`
4. Update DNS records (Vercel provides instructions)
5. SSL certificate auto-generated

**DNS Records to Add:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait 24-48 hours for propagation.

---

## 📊 Environment Variables

Your app doesn't need any! All data is stored in browser LocalStorage.

If you add backend features later:
1. Go to project settings
2. Click "Environment Variables"
3. Add variables
4. Redeploy

---

## 🧪 Testing Your Deployment

After deployment, test:

**PWA Installation:**
1. Visit your Vercel URL on mobile
2. Browser prompts "Add to Home Screen"
3. Install and test offline

**Features to Test:**
- ✅ All three pages load
- ✅ Navigation works
- ✅ Themes switch properly
- ✅ Data persists (add habits/tasks)
- ✅ Settings work
- ✅ Screenshot feature works
- ✅ Works offline after first visit

---

## 🐛 Troubleshooting

### Issue: 404 errors
**Fix:** Check `vercel.json` routes configuration

### Issue: Service Worker not registering
**Fix:** Ensure HTTPS (Vercel provides this automatically)

### Issue: Fonts/Icons not loading
**Fix:** Check public folder structure

### Issue: Routes not working
**Fix:** Verify server.js redirects are correct

---

## 📱 After Deployment - PWA Testing

### On Android:
1. Open in Chrome
2. Menu → "Add to Home Screen"
3. Icon appears on home screen
4. Opens like native app!

### On iOS:
1. Open in Safari
2. Tap Share button
3. "Add to Home Screen"
4. App icon on home screen

### On Desktop:
1. Open in Chrome/Edge
2. Install button in address bar
3. Installs as desktop app

---

## 🔒 Security & Performance

Vercel provides automatically:
- ✅ HTTPS/SSL certificate
- ✅ CDN (global edge network)
- ✅ DDoS protection
- ✅ Automatic compression
- ✅ Image optimization
- ✅ 99.99% uptime

---

## 📈 Analytics (Optional)

### Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

Add to your HTML files:
```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

Track page views, performance, etc.

---

## 💰 Pricing

**Hobby (Free) Plan:**
- ✅ Unlimited deployments
- ✅ HTTPS included
- ✅ 100 GB bandwidth/month
- ✅ Unlimited projects
- ✅ Perfect for your app!

**Pro Plan ($20/month):**
- More bandwidth
- Password protection
- Advanced analytics

Your app works perfectly on the free plan! 🎉

---

## 🎯 Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Rollback to previous deployment
vercel rollback

# Remove deployment
vercel rm deployment-url
```

---

## ✅ Post-Deployment Checklist

After successful deployment:
- [ ] Test PWA installation on mobile
- [ ] Verify all pages load correctly
- [ ] Test navigation between pages
- [ ] Check themes work
- [ ] Test offline functionality
- [ ] Verify data persistence
- [ ] Test on different browsers
- [ ] Share URL with friends! 🎉

---

## 🔗 Your Deployed URLs

After deployment, you'll have:
- **Production**: `https://habitkit.vercel.app`
- **Habit Tracker**: `https://habitkit.vercel.app/habit-tracker`
- **Pomodoro**: `https://habitkit.vercel.app/pomodoro`
- **Tasks**: `https://habitkit.vercel.app/task-manager`

---

## 🚀 Next Steps

After Vercel deployment:
1. ✅ **Share your app** - Send URL to friends
2. ✅ **Get feedback** - Test with users
3. ✅ **Add to app stores** - Use Capacitor (see CAPACITOR_SETUP.md)
4. ✅ **Custom domain** - Professional URL
5. ✅ **Monitor usage** - Vercel analytics

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Node.js on Vercel**: https://vercel.com/docs/functions/serverless-functions/runtimes/node-js
- **Vercel CLI**: https://vercel.com/docs/cli
- **Support**: https://vercel.com/support

---

## 🎊 Congratulations!

Your HabitKit app is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Installable as PWA
- ✅ Fast and secure
- ✅ Ready for users!

Share it with the world! 🌍
