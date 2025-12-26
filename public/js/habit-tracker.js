// Habit Tracker JavaScript
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let currentFilter = 'all';
let editingHabitId = null;

function ensureFirstTimeExperience() {
    try {
        const onboardedKey = 'habitkit-habits-onboarded';
        const hasOnboarded = localStorage.getItem(onboardedKey) === 'true';

        // Only preload if: not onboarded yet AND there are no habits.
        if (!hasOnboarded && (!Array.isArray(habits) || habits.length === 0)) {
            const todayKey = new Date().toISOString().split('T')[0];
            const demoCompletions = {
                // Pre-fill a visible streak + weekly progress.
                [todayKey]: 1,
                [addDaysToDateKey(todayKey, -1)]: 1,
                [addDaysToDateKey(todayKey, -2)]: 1,
                [addDaysToDateKey(todayKey, -3)]: 1,
                [addDaysToDateKey(todayKey, -5)]: 1
            };

            const demoHabit = {
                id: Date.now(),
                createdAt: new Date().toISOString(),
                name: 'Practice a skill',
                description: 'Start small: 10 minutes on the skill you want to improve.',
                category: 'personal',
                icon: '🎯',
                color: '#a855f7',
                goal: 1,
                completions: demoCompletions
            };

            habits = [demoHabit];
            localStorage.setItem('habits', JSON.stringify(habits));
            localStorage.setItem(onboardedKey, 'true');
        }
    } catch (e) {
        // If localStorage is unavailable for any reason, fail silently.
        console.warn('Onboarding init skipped:', e);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    ensureFirstTimeExperience();
    renderHabits();
    setupEventListeners();
});

function setupEventListeners() {
    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', openSettingsModal);
    document.getElementById('closeSettingsModal').addEventListener('click', closeSettingsModal);
    
    // Stats button - generate screenshot
    document.getElementById('statsBtn').addEventListener('click', generateShareableScreenshot);
    
    // Add habit button
    document.getElementById('addHabitBtn').addEventListener('click', openAddModal);
    
    // Close modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Save habit
    document.getElementById('saveHabit').addEventListener('click', saveHabit);
    
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            renderHabits();
        });
    });
    
    // Emoji picker
    document.querySelectorAll('.emoji-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const emoji = e.target.dataset.emoji;
            document.getElementById('habitIcon').value = emoji;
            document.querySelectorAll('.emoji-option').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });
    
    // Color circle picker
    document.querySelectorAll('.color-circle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const color = e.target.dataset.color;
            document.getElementById('habitColor').value = color;
            document.querySelectorAll('.color-circle').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });
    
    // Close modal on outside click
    document.getElementById('habitModal').addEventListener('click', (e) => {
        if (e.target.id === 'habitModal') {
            closeModal();
        }
    });
    
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettingsModal();
        }
    });
    
    // Backup/restore functionality
    document.getElementById('exportDataBtn').addEventListener('click', exportAllData);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', importAllData);
    document.getElementById('clearDataBtn').addEventListener('click', clearAllData);
    
    // Theme selector in modal
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.theme;
            if (window.applyTheme) {
                window.applyTheme(theme);
            }
            updateThemeButtons();
        });
    });
}

function openAddModal() {
    editingHabitId = null;
    document.getElementById('modalTitle').textContent = 'Add Habit';
    document.getElementById('habitName').value = '';
    document.getElementById('habitDesc').value = '';
    document.getElementById('habitCategory').value = 'fitness';
    document.getElementById('habitIcon').value = '📚';
    document.getElementById('habitColor').value = '#ef4444';
    document.getElementById('habitGoal').value = 1;
    document.getElementById('habitModal').classList.add('active');
}

function openEditModal(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    editingHabitId = habitId;
    document.getElementById('modalTitle').textContent = 'Edit Habit';
    document.getElementById('habitName').value = habit.name;
    document.getElementById('habitDesc').value = habit.description;
    document.getElementById('habitCategory').value = habit.category;
    document.getElementById('habitIcon').value = habit.icon;
    document.getElementById('habitColor').value = habit.color;
    document.getElementById('habitGoal').value = habit.goal;
    
    // Select the active color circle
    document.querySelectorAll('.color-circle').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.color === habit.color) {
            btn.classList.add('selected');
        }
    });
    
    document.getElementById('habitModal').classList.add('active');
}

function closeModal() {
    document.getElementById('habitModal').classList.remove('active');
}

function saveHabit() {
    const name = document.getElementById('habitName').value.trim();
    const description = document.getElementById('habitDesc').value.trim();
    const category = document.getElementById('habitCategory').value;
    const icon = document.getElementById('habitIcon').value;
    const color = document.getElementById('habitColor').value;
    const goal = parseInt(document.getElementById('habitGoal').value);
    
    if (!name) {
        alert('Please enter a habit name');
        return;
    }
    
    const habitData = {
        name,
        description,
        category,
        icon,
        color,
        goal,
        completions: {}
    };
    
    if (editingHabitId) {
        // Edit existing habit
        const index = habits.findIndex(h => h.id === editingHabitId);
        habits[index] = { ...habits[index], ...habitData };
    } else {
        // Add new habit
        habitData.id = Date.now();
        habitData.createdAt = new Date().toISOString();
        habits.push(habitData);
    }
    
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
    closeModal();
}

function deleteHabit(habitId) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(h => h.id !== habitId);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }
}

function toggleHabitCompletion(habitId, date = null) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const dateKey = date || new Date().toISOString().split('T')[0];
    
    if (!habit.completions) {
        habit.completions = {};
    }
    
    if (habit.completions[dateKey]) {
        habit.completions[dateKey]++;
        if (habit.completions[dateKey] > habit.goal) {
            habit.completions[dateKey] = 0;
        }
    } else {
        habit.completions[dateKey] = 1;
    }
    
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

// Color name mapping removed - now using direct color values

function generateHabitGrid(habit) {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const days = [];
    
    // Get day of year (1-365/366)
    const currentDayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    const isLeapYear = (today.getFullYear() % 4 === 0 && today.getFullYear() % 100 !== 0) || (today.getFullYear() % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    
    // Generate grid for the entire year, but only show up to current day
    for (let dayNum = 1; dayNum <= daysInYear; dayNum++) {
        const date = new Date(startOfYear);
        date.setDate(dayNum);
        const dateKey = date.toISOString().split('T')[0];
        
        const completed = habit.completions && habit.completions[dateKey] >= habit.goal;
        const isFuture = dayNum > currentDayOfYear;
        
        days.push(`<div class="habit-day ${completed ? 'completed' : ''} ${isFuture ? 'future' : ''}" 
                       data-date="${dateKey}" 
                       data-day="${dayNum}"
                       title="${dateKey} (Day ${dayNum}/${daysInYear})"></div>`);
    }
    
    return days.join('');
}

function isHabitCompletedToday(habit) {
    const today = new Date().toISOString().split('T')[0];
    return habit.completions && habit.completions[today] >= habit.goal;
}

function isHabitCompletedOnDate(habit, dateKey) {
    return Boolean(habit.completions && habit.completions[dateKey] >= habit.goal);
}

function addDaysToDateKey(dateKey, days) {
    const date = new Date(dateKey + 'T00:00:00.000Z');
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().split('T')[0];
}

function getHabitStreak(habit, endDateKey = null) {
    const endKey = endDateKey || new Date().toISOString().split('T')[0];

    // Typical streak: consecutive completed days ending today. If today isn't completed, streak is 0.
    if (!isHabitCompletedOnDate(habit, endKey)) return 0;

    let streak = 0;
    let cursor = endKey;

    while (isHabitCompletedOnDate(habit, cursor)) {
        streak++;
        cursor = addDaysToDateKey(cursor, -1);
    }

    return streak;
}

function getHabitWeeklyProgress(habit, endDateKey = null) {
    const endKey = endDateKey || new Date().toISOString().split('T')[0];
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const key = addDaysToDateKey(endKey, -i);
        days.push({ dateKey: key, completed: isHabitCompletedOnDate(habit, key) });
    }

    const completedDays = days.reduce((sum, d) => sum + (d.completed ? 1 : 0), 0);
    return {
        days,
        completedDays,
        totalDays: 7,
        percent: Math.round((completedDays / 7) * 100)
    };
}

function renderHabitInsights(habit) {
    const streak = getHabitStreak(habit);
    const weekly = getHabitWeeklyProgress(habit);

    const calendarDays = weekly.days.map(d => {
        const dayLabel = new Date(d.dateKey + 'T00:00:00.000Z').toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
        return `
            <div class="mini-day ${d.completed ? 'completed' : 'missed'}" title="${d.dateKey}">
                <span class="mini-day-label">${dayLabel}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="habit-insights">
            <div class="habit-metrics">
                <div class="metric-badge" title="Consecutive completed days ending today">
                    🔥 <span class="metric-value">${streak}</span><span class="metric-suffix">-day streak</span>
                </div>
                <div class="metric-badge" title="Days completed in the last 7 days">
                    ${weekly.completedDays}/7 days
                </div>
            </div>
            <div class="weekly-progress" aria-label="Weekly progress">
                <div class="weekly-progress-bar">
                    <div class="weekly-progress-fill" style="width: ${weekly.percent}%;"></div>
                </div>
            </div>
            <div class="mini-calendar" aria-label="Last 7 days">
                ${calendarDays}
            </div>
        </div>
    `;
}

function renderHabits() {
    const container = document.getElementById('habitsContainer');
    
    let filteredHabits = habits;
    if (currentFilter !== 'all') {
        filteredHabits = habits.filter(h => h.category === currentFilter);
    }
    
    if (filteredHabits.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Welcome</h3>
                <p>Start by adding one habit related to the skill you want to improve.</p>
                <button class="empty-state-cta" onclick="openAddModal()">+ Add your first habit</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredHabits.map(habit => {
        const isCompleted = isHabitCompletedToday(habit);
        const streak = getHabitStreak(habit);
        const streakedClass = streak > 0 ? 'streaked' : '';
        
        return `
            <div class="habit-card ${streakedClass}" data-id="${habit.id}" style="--habit-color: ${habit.color}">
                <div class="habit-header">
                    <div class="habit-info">
                        <div class="habit-icon" style="background: ${habit.color}20;">${habit.icon}</div>
                        <div class="habit-details">
                            <h3>${habit.name}</h3>
                            <p>${habit.description}</p>
                        </div>
                    </div>
                    <div class="habit-status ${isCompleted ? 'completed' : ''}" 
                         onclick="toggleHabitCompletion(${habit.id})"
                         style="background: ${isCompleted ? habit.color + '33' : 'rgba(255, 255, 255, 0.1)'}; color: ${isCompleted ? habit.color : '#fff'}">
                        ${isCompleted ? '✓' : '○'}
                    </div>
                </div>
                ${renderHabitInsights(habit)}
                <div class="habit-grid" style="color: ${habit.color}">
                    ${generateHabitGrid(habit)}
                </div>
            </div>
        `;
    }).join('');
    
    // Add click listeners for editing
    document.querySelectorAll('.habit-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('habit-status')) {
                const habitId = parseInt(card.dataset.id);
                showHabitDetails(habitId);
            }
        });
    });
}

function showHabitDetails(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    // For now, just open edit modal
    // In a fuller implementation, we'd show a detail view first
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-btn" onclick="this.closest('.modal').remove()">✕</button>
                <h2>${habit.icon} ${habit.name}</h2>
            </div>
            <div class="modal-body">
                <p style="color: #999; margin-bottom: 1rem;">${habit.description}</p>
                ${renderHabitInsights(habit)}
                <div class="habit-grid" style="color: ${habit.color}; margin-bottom: 1.5rem;">
                    ${generateHabitGrid(habit)}
                </div>
            </div>
            <div class="habit-detail-actions">
                <button class="complete-btn" onclick="toggleHabitCompletion(${habitId}); this.closest('.modal').remove(); renderHabits();">
                    ✓ Complete
                </button>
                <button class="edit-btn" onclick="this.closest('.modal').remove(); openEditModal(${habitId});">
                    ✎ Edit
                </button>
                <button class="delete-habit-btn" onclick="deleteHabit(${habitId}); this.closest('.modal').remove();">
                    🗑 Delete
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// No sample data - start fresh
// Users can add their own habits using the + button

// Settings Modal Functions
function openSettingsModal() {
    document.getElementById('settingsModal').classList.add('active');
    updateThemeButtons();
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

function updateThemeButtons() {
    const currentTheme = localStorage.getItem('app-theme') || 'theme-dark';
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        }
    });
}

// Export all data
function exportAllData() {
    const allData = {
        habits: JSON.parse(localStorage.getItem('habits') || '[]'),
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
        theme: localStorage.getItem('app-theme') || 'theme-dark',
        pomodoroSettings: JSON.parse(localStorage.getItem('pomodoroSettings') || '{}'),
        pomodoroSessions: localStorage.getItem('pomodoroSessions') || '0',
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productivity-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showToast('📤 Data exported successfully!');
}

// Import all data
function importAllData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!data.version) {
                throw new Error('Invalid backup file');
            }
            
            // Confirm before importing
            if (!confirm('This will replace all your current data. Are you sure you want to continue?')) {
                return;
            }
            
            // Import data
            if (data.habits) localStorage.setItem('habits', JSON.stringify(data.habits));
            if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
            if (data.theme) localStorage.setItem('app-theme', data.theme);
            if (data.pomodoroSettings) localStorage.setItem('pomodoroSettings', JSON.stringify(data.pomodoroSettings));
            if (data.pomodoroSessions) localStorage.setItem('pomodoroSessions', data.pomodoroSessions);
            
            showToast('📥 Data imported successfully!');
            
            // Reload page after a delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error) {
            alert('Failed to import data. Please make sure you selected a valid backup file.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

// Clear all data
function clearAllData() {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL your habits, tasks, and settings. This cannot be undone!\n\nAre you absolutely sure?')) {
        return;
    }
    
    if (!confirm('Last chance! Click OK to delete everything, or Cancel to keep your data.')) {
        return;
    }
    
    // Clear all localStorage
    localStorage.removeItem('habits');
    localStorage.removeItem('tasks');
    localStorage.removeItem('pomodoroSettings');
    localStorage.removeItem('pomodoroSessions');
    // Keep theme preference
    
    showToast('🗑️ All data cleared!');
    
    // Reload page
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

// Generate shareable screenshot with improved quality
async function generateShareableScreenshot() {
    if (habits.length === 0) {
        alert('Add some habits first to create a shareable screenshot!');
        return;
    }
    
    // Show loading modal
    showLoadingModal('Generating screenshot...');
    
    try {
        // Get the current theme
        const currentTheme = document.body.classList.contains('theme-light') ? 'light' :
                           document.body.classList.contains('theme-catppuccin') ? 'catppuccin' : 'dark';
        
        // Hide UI elements that shouldn't be in the screenshot
        const header = document.querySelector('.app-header');
        const categoryTabs = document.querySelector('.category-tabs');
        const bottomNav = document.querySelector('.global-bottom-nav');
        const container = document.querySelector('.container');
        
        // Store original styles
        const originalHeaderDisplay = header.style.display;
        const originalTabsDisplay = categoryTabs.style.display;
        const originalNavDisplay = bottomNav.style.display;
        const originalContainerPadding = container.style.paddingBottom;
        
        // Hide elements temporarily
        header.style.display = 'none';
        categoryTabs.style.display = 'none';
        bottomNav.style.display = 'none';
        container.style.paddingBottom = '30px';
        
        // Add beautiful watermark/title for the screenshot
        const watermark = document.createElement('div');
        watermark.id = 'screenshot-watermark';
        watermark.style.cssText = `
            padding: 30px 20px 20px 20px;
            text-align: center;
            background: inherit;
        `;
        
        const bgColor = currentTheme === 'light' ? '#ffffff' : 
                       currentTheme === 'catppuccin' ? '#1e1e2e' : '#000000';
        const textColor = currentTheme === 'light' ? '#1a1a1a' : '#ffffff';
        const accentColor = currentTheme === 'catppuccin' ? '#cba6f7' : '#a855f7';
        const subTextColor = currentTheme === 'light' ? '#666' : '#999';
        
        watermark.innerHTML = `
            <h2 style="font-size: 2.25rem; margin-bottom: 8px; font-weight: 700; color: ${textColor};">
                My Habit<span style="color: ${accentColor};">Kit</span> Progress
            </h2>
            <p style="color: ${subTextColor}; font-size: 1rem; margin-bottom: 15px;">
                ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div style="width: 60px; height: 3px; background: ${accentColor}; margin: 0 auto; border-radius: 2px;"></div>
        `;
        container.insertBefore(watermark, container.firstChild);
        
        // Add footer
        const footer = document.createElement('div');
        footer.id = 'screenshot-footer';
        footer.style.cssText = `
            padding: 20px;
            text-align: center;
            color: ${subTextColor};
            font-size: 0.9rem;
            background: inherit;
        `;
        footer.innerHTML = `
            <p style="margin-bottom: 5px;">🎯 ${habits.length} habit${habits.length !== 1 ? 's' : ''} tracked</p>
            <p style="font-size: 0.8rem; opacity: 0.7;">Keep building great habits! 🌟</p>
        `;
        container.appendChild(footer);
        
        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Generate high-quality screenshot
        const canvas = await html2canvas(container, {
            backgroundColor: bgColor,
            scale: 3, // Ultra high quality (3x)
            logging: false,
            useCORS: true,
            allowTaint: true,
            windowWidth: 600,
            windowHeight: container.scrollHeight,
            imageTimeout: 0,
            removeContainer: false
        });
        
        // Restore original UI
        watermark.remove();
        footer.remove();
        header.style.display = originalHeaderDisplay;
        categoryTabs.style.display = originalTabsDisplay;
        bottomNav.style.display = originalNavDisplay;
        container.style.paddingBottom = originalContainerPadding;
        
        // Hide loading modal
        hideLoadingModal();
        
        // Show share options modal
        showShareOptionsModal(canvas);
        
    } catch (error) {
        console.error('Screenshot error:', error);
        hideLoadingModal();
        showToast('❌ Failed to generate screenshot. Please try again.', 'error');
    }
}

// Show loading modal
function showLoadingModal(message) {
    const modal = document.createElement('div');
    modal.id = 'screenshot-loading-modal';
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 300px; text-align: center;">
            <div style="padding: 2rem;">
                <div style="width: 60px; height: 60px; border: 4px solid rgba(168, 85, 247, 0.2); border-top-color: #a855f7; border-radius: 50%; margin: 0 auto 1.5rem; animation: spin 1s linear infinite;"></div>
                <p style="font-size: 1.1rem; color: var(--text-primary);">${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Hide loading modal
function hideLoadingModal() {
    const modal = document.getElementById('screenshot-loading-modal');
    if (modal) modal.remove();
}

// Show share options modal
function showShareOptionsModal(canvas) {
    const modal = document.createElement('div');
    modal.id = 'share-options-modal';
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-btn" onclick="document.getElementById('share-options-modal').remove();">✕</button>
                <h2>📸 Share Your Progress</h2>
            </div>
            <div class="modal-body">
                <div style="background: var(--bg-secondary); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
                    <img id="screenshot-preview" style="width: 100%; border-radius: 8px; display: block;" />
                </div>
                
                <button class="action-btn" onclick="downloadScreenshot()" style="margin-bottom: 0.75rem;">
                    💾 Download Image
                </button>
                
                <button class="action-btn" onclick="copyScreenshotToClipboard()" style="margin-bottom: 0.75rem;">
                    📋 Copy to Clipboard
                </button>
                
                <button class="action-btn" onclick="shareScreenshotNative()" id="nativeShareBtn">
                    🔗 Share via...
                </button>
                
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 1rem; text-align: center;">
                    High quality 3x resolution • Perfect for social media
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Set preview image
    const preview = document.getElementById('screenshot-preview');
    preview.src = canvas.toDataURL('image/png');
    
    // Hide native share button if not available
    if (!navigator.share) {
        document.getElementById('nativeShareBtn').style.display = 'none';
    }
    
    // Store canvas globally for functions
    window.screenshotCanvas = canvas;
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'share-options-modal') {
            modal.remove();
        }
    });
}

// Download screenshot
window.downloadScreenshot = function() {
    const canvas = window.screenshotCanvas;
    const fileName = `habitkit-${new Date().toISOString().split('T')[0]}.png`;
    
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
        
        document.getElementById('share-options-modal').remove();
        showToast('📥 Screenshot downloaded successfully!');
    }, 'image/png', 1.0);
};

// Copy to clipboard
window.copyScreenshotToClipboard = async function() {
    try {
        const canvas = window.screenshotCanvas;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
        
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        
        document.getElementById('share-options-modal').remove();
        showToast('📋 Copied to clipboard! Paste it anywhere.');
    } catch (err) {
        showToast('❌ Failed to copy. Try downloading instead.', 'error');
    }
};

// Native share
window.shareScreenshotNative = async function() {
    try {
        const canvas = window.screenshotCanvas;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
        const file = new File([blob], `habitkit-${new Date().toISOString().split('T')[0]}.png`, { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'My HabitKit Progress',
                text: 'Check out my habit tracking progress! 🎯',
                files: [file]
            });
            document.getElementById('share-options-modal').remove();
        } else {
            showToast('❌ Sharing not supported. Try downloading instead.', 'error');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            showToast('❌ Failed to share. Try downloading instead.', 'error');
        }
    }
};

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const bgColor = type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(168, 85, 247, 0.95)';
    
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        font-size: 1rem;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease-out;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);
