# HabitKit - Productivity Hub 🚀

A beautiful productivity app with habit tracking, Pomodoro timer, and task management. Built with vanilla JavaScript, ready to deploy as a web app or native mobile/desktop app.

![HabitKit](https://img.shields.io/badge/version-1.0.0-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📊 Habit Tracker
- Track daily habits with beautiful glowing dots
- Visual year-long progress grid (365 days)
- Categories (Fitness, Study, Social, Work)
- Custom emoji icons and colors
- Streak tracking and completion status
- Export/Import data for backup

### ⏱️ Pomodoro Clock
- 25-minute focus sessions
- Short (5 min) and long (15 min) breaks
- Circular animated timer with progress ring
- Session counter
- Customizable timer durations
- Audio notifications
- Auto-start breaks option

### ✓ Task Manager
- Quick task entry
- Priority levels (High, Medium, Low)
- Due date tracking with overdue warnings
- Categories and filters
- Mark as complete/incomplete
- Persistent storage

### 🎨 Themes
- **Dark Theme** - Pure black, perfect for night
- **Light Theme** - Clean white, great for day
- **Catppuccin Theme** - Beautiful mocha palette

### 💾 Data Management
- Local storage (privacy-first)
- Export all data as JSON
- Import from backup
- No server needed

### 📸 Screenshot Sharing
- Generate beautiful progress screenshots
- 3x high resolution
- Download, copy, or share natively
- Theme-aware designs

## 🚀 Quick Start

### Run Locally

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
# http://localhost:3000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 📱 Build Native Apps

### Prerequisites
- Node.js 18+
- Android Studio (for Android)
- Xcode (for iOS, Mac only)

### Android App
```bash
npm run cap:add:android
npm run cap:open:android
```

### iOS App
```bash
npm run cap:add:ios
npm run cap:open:ios
```

### Desktop App (Electron)
```bash
npm run cap:add:electron
cd electron && npm run electron:start
```

## 🌐 Progressive Web App (PWA)

The app is PWA-ready! Users can install it directly from their browser:

**Mobile:**
1. Visit the deployed URL
2. Tap "Add to Home Screen"
3. App installs like a native app!

**Features:**
- ✅ Offline support
- ✅ App icon on home screen
- ✅ Full-screen experience
- ✅ Fast loading with service worker

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (no frameworks)
- **Styling**: Custom CSS3
- **Storage**: LocalStorage API
- **Server**: Express.js (Node.js)
- **Deployment**: Vercel-ready
- **Native Apps**: Capacitor
- **PWA**: Service Worker + Manifest

## 📂 Project Structure

```
habitkit/
├── public/
│   ├── css/                 # Stylesheets
│   │   ├── styles.css       # Global styles
│   │   ├── themes.css       # Theme system
│   │   ├── habit-tracker.css
│   │   ├── pomodoro.css
│   │   ├── task-manager.css
│   │   └── loading.css
│   ├── js/                  # JavaScript
│   │   ├── habit-tracker.js
│   │   ├── pomodoro.js
│   │   ├── task-manager.js
│   │   ├── theme-switcher.js
│   │   └── loading.js
│   ├── icons/               # App icons (add your own)
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   └── *.html              # Pages
├── server.js               # Express server
├── capacitor.config.json   # Native app config
├── package.json            # Dependencies
└── vercel.json            # Vercel config
```

## 📖 Documentation

- **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** - Complete deployment guide
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Deploy to web
- **[CAPACITOR_SETUP.md](CAPACITOR_SETUP.md)** - Build native apps
- **[ICON_GENERATION.md](ICON_GENERATION.md)** - Create app icons
- **[NATIVE_APPS_GUIDE.md](NATIVE_APPS_GUIDE.md)** - All platform options

## 🎨 Customization

### Change Colors
Edit `public/css/themes.css` to customize theme colors.

### Add More Habits
Users can add unlimited habits with custom emojis and colors.

### Modify Timer
Edit `public/js/pomodoro.js` to change default timer durations.

## 📱 Screenshots

Coming soon! Add your app screenshots to `public/screenshots/`

## 🌟 Features in Detail

### Habit Tracking
- Click the ✓ button to mark habits complete
- View 365-day progress grid
- Dots glow with your chosen color
- Export progress as beautiful screenshots

### Pomodoro Timer
- Click play to start 25-minute session
- Automatic break timers
- Customizable durations in settings
- Browser notifications when timer ends

### Task Management
- Quick add with enter key
- Click tasks to edit details
- Filter by status (all/active/completed)
- Drag to reorder (coming soon)

## 🔒 Privacy

- **All data stays on your device** (LocalStorage)
- **No tracking or analytics** (unless you add them)
- **No account required**
- **Works completely offline**

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Other Platforms
- Netlify: Deploy from GitHub
- Railway: Node.js deployment
- Heroku: Use Procfile
- Self-hosted: Run `npm start`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Design inspired by HabitKit and Pomodrone apps
- Built with modern web standards
- Powered by Capacitor and Vercel

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation files
- Read the deployment guides

## 🎯 Roadmap

- [ ] Cloud sync (optional)
- [ ] Habit statistics and charts
- [ ] Drag-and-drop task reordering
- [ ] Widget support
- [ ] Social sharing improvements
- [ ] Dark/Light mode auto-switch
- [ ] More themes

## ⭐ Star This Repo!

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ for productivity enthusiasts**

[Live Demo](https://your-app.vercel.app) | [Report Bug](../../issues) | [Request Feature](../../issues)
