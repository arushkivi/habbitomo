// Theme Switcher
const THEMES = {
    DARK: 'theme-dark',
    LIGHT: 'theme-light',
    CATPPUCCIN: 'theme-catppuccin'
};

// Get saved theme or default to dark
let currentTheme = localStorage.getItem('app-theme') || THEMES.DARK;

// Apply theme on page load (removed createThemeSwitcher - now in settings modal)

// Apply theme to body
function applyTheme(theme) {
    // Remove all theme classes but preserve other classes like 'pomodoro-theme', 'dark-theme', etc.
    document.body.classList.remove(THEMES.DARK, THEMES.LIGHT, THEMES.CATPPUCCIN);
    document.body.classList.add(theme);
    currentTheme = theme;
    localStorage.setItem('app-theme', theme);
    updateActiveThemeButton();
    
    // Keep pomodoro-theme class if it exists
    if (document.body.classList.contains('pomodoro-theme')) {
        // Ensure pomodoro-theme stays
        document.body.classList.add('pomodoro-theme');
    }
}

// Expose applyTheme globally for settings modal
window.applyTheme = applyTheme;

// Theme switcher UI removed - now integrated in settings modal

// Initialize on DOM load (don't create UI, just apply theme)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(currentTheme);
    });
} else {
    applyTheme(currentTheme);
}
