// Pomodoro Clock JavaScript
let timer = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'pomodoro';
let sessionCount = parseInt(localStorage.getItem('pomodoroSessions')) || 0;

// Settings
let settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    autoStartBreaks: false,
    soundEnabled: true
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    updateSessionCount();
    setupEventListeners();
    applyThemeForMode(currentMode);
});

function setupEventListeners() {
    // Play/Pause button
    document.getElementById('playBtn').addEventListener('click', toggleTimer);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetTimer);
    
    // Skip button
    document.getElementById('skipBtn').addEventListener('click', skipTimer);
    
    // Timer mode tabs
    document.querySelectorAll('.timer-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchMode(e.target.dataset.mode, parseInt(e.target.dataset.minutes));
        });
    });
    
    // Settings
    document.getElementById('settingsBtn').addEventListener('click', openSettings);
    document.getElementById('closeSettings').addEventListener('click', closeSettings);
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    
    // Close modal on outside click
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettings();
        }
    });
}

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isRunning = true;
    document.getElementById('playIcon').style.display = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
    document.body.classList.add('timer-running');
    
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            timerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    document.getElementById('playIcon').style.display = 'block';
    document.getElementById('pauseIcon').style.display = 'none';
    document.body.classList.remove('timer-running');
    clearInterval(timer);
}

function resetTimer() {
    pauseTimer();
    const minutes = currentMode === 'pomodoro' ? settings.pomodoroTime :
                   currentMode === 'short' ? settings.shortBreakTime :
                   settings.longBreakTime;
    timeLeft = minutes * 60;
    updateDisplay();
}

function skipTimer() {
    pauseTimer();
    timerComplete();
}

function timerComplete() {
    pauseTimer();
    
    // Play sound if enabled
    if (settings.soundEnabled) {
        playNotificationSound();
    }
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
            body: currentMode === 'pomodoro' ? 'Time for a break!' : 'Break is over!',
            icon: '/favicon.ico'
        });
    }
    
    // Update session count if pomodoro completed
    if (currentMode === 'pomodoro') {
        sessionCount++;
        localStorage.setItem('pomodoroSessions', sessionCount);
        updateSessionCount();
    }
    
    // Auto-switch to break mode
    if (currentMode === 'pomodoro') {
        const nextMode = sessionCount % 4 === 0 ? 'long' : 'short';
        const minutes = nextMode === 'long' ? settings.longBreakTime : settings.shortBreakTime;
        switchMode(nextMode, minutes);
        
        if (settings.autoStartBreaks) {
            setTimeout(startTimer, 1000);
        }
    } else {
        switchMode('pomodoro', settings.pomodoroTime);
    }
}

function switchMode(mode, minutes) {
    pauseTimer();
    currentMode = mode;
    timeLeft = minutes * 60;
    
    // Update active tab
    document.querySelectorAll('.timer-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.mode === mode) {
            tab.classList.add('active');
        }
    });
    
    applyThemeForMode(mode);
    updateDisplay();
}

function applyThemeForMode(mode) {
    document.body.classList.remove('short-break', 'long-break');
    
    if (mode === 'short') {
        document.body.classList.add('short-break');
    } else if (mode === 'long') {
        document.body.classList.add('long-break');
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
    
    // Update label
    const modeLabel = currentMode === 'pomodoro' ? 'POMODORO' :
                     currentMode === 'short' ? 'SHORT BREAK' :
                     'LONG BREAK';
    const modeMinutes = currentMode === 'pomodoro' ? settings.pomodoroTime :
                       currentMode === 'short' ? settings.shortBreakTime :
                       settings.longBreakTime;
    document.getElementById('timerLabel').textContent = `${modeLabel} ${modeMinutes} MIN`;
    
    // Update progress ring
    const totalTime = modeMinutes * 60;
    const progress = (totalTime - timeLeft) / totalTime;
    const circumference = 2 * Math.PI * 130; // radius is 130
    const offset = circumference * (1 - progress);
    
    document.getElementById('progressCircle').style.strokeDashoffset = offset;
    
    // Update page title
    document.title = `${display} - Pomodoro`;
}

function updateSessionCount() {
    document.getElementById('sessionCount').textContent = sessionCount;
}

function openSettings() {
    document.getElementById('pomodoroTime').value = settings.pomodoroTime;
    document.getElementById('shortBreakTime').value = settings.shortBreakTime;
    document.getElementById('longBreakTime').value = settings.longBreakTime;
    document.getElementById('autoStartBreaks').checked = settings.autoStartBreaks;
    document.getElementById('soundEnabled').checked = settings.soundEnabled;
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
    settings.pomodoroTime = parseInt(document.getElementById('pomodoroTime').value);
    settings.shortBreakTime = parseInt(document.getElementById('shortBreakTime').value);
    settings.longBreakTime = parseInt(document.getElementById('longBreakTime').value);
    settings.autoStartBreaks = document.getElementById('autoStartBreaks').checked;
    settings.soundEnabled = document.getElementById('soundEnabled').checked;
    
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    
    // Update timer tabs
    document.querySelectorAll('.timer-tab').forEach(tab => {
        if (tab.dataset.mode === 'pomodoro') {
            tab.dataset.minutes = settings.pomodoroTime;
        } else if (tab.dataset.mode === 'short') {
            tab.dataset.minutes = settings.shortBreakTime;
        } else if (tab.dataset.mode === 'long') {
            tab.dataset.minutes = settings.longBreakTime;
        }
    });
    
    // Reset timer with new settings if not running
    if (!isRunning) {
        resetTimer();
    }
    
    closeSettings();
}

function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize progress circle
document.getElementById('progressCircle').style.strokeDasharray = 2 * Math.PI * 130;
