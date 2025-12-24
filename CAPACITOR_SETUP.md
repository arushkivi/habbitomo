# Capacitor Setup Guide - Native Apps

## 📱 Quick Start - Native Apps in 30 Minutes

### Prerequisites:

**For Android:**
- ✅ Android Studio installed
- ✅ Java JDK 11+
- ✅ Android SDK

**For iOS (Mac only):**
- ✅ Xcode installed
- ✅ Xcode Command Line Tools
- ✅ CocoaPods (`sudo gem install cocoapods`)

**For All Platforms:**
- ✅ Node.js installed (you have this)
- ✅ npm or yarn

---

## 🚀 Step 1: Initialize Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init
```

**When prompted:**
- App name: `HabitKit`
- App ID: `com.habitkit.app` (or your custom domain)
- Web asset directory: `public`

---

## 📱 Step 2: Add Android Platform

```bash
# Install Android package
npm install @capacitor/android

# Add Android platform
npx cap add android

# Sync files to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

**In Android Studio:**
1. Wait for Gradle sync
2. Click "Run" (green play button)
3. Select emulator or connected device
4. App installs and runs!

**Build APK:**
```bash
cd android
./gradlew assembleRelease
# APK located at: android/app/build/outputs/apk/release/
```

---

## 🍎 Step 3: Add iOS Platform (Mac only)

```bash
# Install iOS package
npm install @capacitor/ios

# Add iOS platform
npx cap add ios

# Sync files to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

**In Xcode:**
1. Select your team (Apple Developer account)
2. Select device/simulator
3. Click "Run" (play button)
4. App installs and runs!

---

## 💻 Step 4: Desktop Apps (Optional)

```bash
# Install Electron package
npm install @capacitor-community/electron

# Add Electron platform
npx cap add @capacitor-community/electron

# Run desktop app
cd electron
npm install
npm run electron:start
```

---

## 🔄 Update Your App

When you make changes to your web code:

```bash
# Sync changes to all platforms
npx cap sync

# Or sync to specific platform
npx cap sync android
npx cap sync ios
```

---

## 📦 Building for Production

### Android (APK for Google Play):

```bash
cd android
./gradlew assembleRelease

# Sign the APK (required for Play Store)
# Follow: https://capacitorjs.com/docs/android/deploying-to-google-play
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

### iOS (IPA for App Store):

1. Open in Xcode: `npx cap open ios`
2. Product → Archive
3. Distribute App → App Store Connect
4. Follow prompts to upload

### Desktop (Electron):

```bash
cd electron
npm run electron:build

# Creates installers for your platform
# Windows: .exe
# Mac: .dmg
# Linux: .AppImage
```

---

## 🎨 App Icons & Splash Screens

### Generate Icons:

1. Create 1024x1024 app icon
2. Use online generator: https://www.appicon.co/
3. Download generated assets

### For Android:
```bash
# Place icons in:
android/app/src/main/res/
├── mipmap-hdpi/
├── mipmap-mdpi/
├── mipmap-xhdpi/
├── mipmap-xxhdpi/
└── mipmap-xxxhdpi/
```

### For iOS:
```bash
# Place icons in:
ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

**Or use Capacitor Asset Generator:**
```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate --iconBackgroundColor '#000000'
```

---

## 🔧 Common Issues & Fixes

### Issue: Gradle sync failed
**Fix:** Update Android Studio and Gradle

### Issue: CocoaPods error
**Fix:** 
```bash
cd ios/App
pod install
```

### Issue: White screen on app launch
**Fix:** Check that `webDir` in `capacitor.config.json` is correct (`public`)

### Issue: App not updating
**Fix:** 
```bash
npx cap sync
# Then rebuild in Android Studio/Xcode
```

---

## 📚 Resources

- **Capacitor Docs:** https://capacitorjs.com/docs
- **Android Guide:** https://capacitorjs.com/docs/android
- **iOS Guide:** https://capacitorjs.com/docs/ios
- **Deployment:** https://capacitorjs.com/docs/guides/deploying-updates

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run cap:sync              # Sync all changes
npm run cap:open:android      # Open Android Studio
npm run cap:open:ios          # Open Xcode

# Building
npm run cap:build:android     # Build Android APK
npm run cap:build:ios         # Build iOS app

# Adding platforms
npm run cap:add:android       # Add Android
npm run cap:add:ios           # Add iOS
npm run cap:add:electron      # Add Desktop
```

---

## ✅ Testing Checklist

Before releasing:
- [ ] Test on real Android device
- [ ] Test on real iOS device
- [ ] Test all features work offline
- [ ] Test app icon appears correctly
- [ ] Test splash screen shows
- [ ] Test navigation between pages
- [ ] Test data persistence
- [ ] Test theme switching
- [ ] Test screenshot feature
- [ ] Test settings/backup

---

## 🚢 Publishing to Stores

### Google Play Store:
1. Create developer account ($25 one-time)
2. Build release APK
3. Create app listing
4. Upload APK
5. Submit for review

### Apple App Store:
1. Join Apple Developer Program ($99/year)
2. Create app in App Store Connect
3. Archive and upload from Xcode
4. Submit for review

**Review times:** 1-3 days typically

---

## 💡 Pro Tips

1. **Test PWA first** - Make sure web version works perfectly
2. **Use hot reload** - `npm run dev` while developing
3. **Keep Capacitor updated** - `npm update @capacitor/core`
4. **Version control** - Commit before adding platforms
5. **Native code** - Minimize custom native code, use web APIs
