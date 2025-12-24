# App Icons Generation Guide

## 🎨 You need to create app icons for your PWA and native apps.

### Quick Option: Use Online Tools

**1. PWA Asset Generator (Recommended)**
- Visit: https://www.pwabuilder.com/imageGenerator
- Upload a 512x512 PNG logo
- Download all icons automatically
- Place in `public/icons/` folder

**2. Favicon Generator**
- Visit: https://realfavicongenerator.net/
- Upload your logo
- Generate all sizes
- Download and extract to `public/icons/`

**3. App Icon Generator (For iOS/Android)**
- Visit: https://www.appicon.co/
- Upload 1024x1024 PNG
- Generate all required sizes
- Download package

### Required Icon Sizes:

```
public/icons/
├── icon-32x32.png      (Favicon)
├── icon-72x72.png      (iOS)
├── icon-96x96.png      (Android)
├── icon-128x128.png    (Desktop)
├── icon-144x144.png    (Android)
├── icon-152x152.png    (iOS)
├── icon-192x192.png    (PWA Standard)
├── icon-384x384.png    (PWA)
└── icon-512x512.png    (PWA, Splash screens)
```

### Create Your Logo:

**Design Guidelines:**
- **Size**: Start with 1024x1024 px
- **Format**: PNG with transparent background
- **Simple**: Bold, recognizable design
- **Colors**: Purple (#a855f7) - matches your app theme
- **Content**: "HK" monogram or habit tracking icon

**Logo Ideas:**
1. **HK Monogram** - Stylized "HK" letters
2. **Check Circle** - ✓ in a circular badge
3. **Habit Grid** - Simplified grid pattern
4. **Streak Flame** - 🔥 stylized
5. **Growth Chart** - Simple upward trend

### Quick Placeholder (For Testing):

I'll create a simple SVG that you can convert:

```html
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#a855f7"/>
  <text x="256" y="320" font-size="280" font-weight="bold" 
        text-anchor="middle" fill="white" font-family="Arial">HK</text>
</svg>
```

Save this as SVG, then convert to PNG at various sizes.

### Using Figma/Canva (Free):

**Figma:**
1. Create 1024x1024 frame
2. Design your logo
3. Export as PNG at different sizes

**Canva:**
1. Use "Custom Size" → 1024x1024
2. Design your logo
3. Download as PNG
4. Use icon generator to create all sizes

### After Generating Icons:

1. Place all icons in `public/icons/` folder
2. Icons will automatically work with PWA
3. For Capacitor, copy to platform resources folders

---

## 📸 Screenshots (Optional but Recommended)

Create app screenshots for app stores:

**Required:**
- **Size**: 1080x1920 px (portrait)
- **Content**: Show your app in action
- **Count**: At least 3-5 screenshots

**What to capture:**
1. Habit tracker with habits
2. Pomodoro timer running
3. Task list with items
4. Settings page
5. Theme variations

Place in `public/screenshots/` folder.
