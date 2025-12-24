// Loading Screen Handler - Only show once per session
(function() {
    // Check if app has already been loaded in this session
    const hasLoadedBefore = sessionStorage.getItem('appLoaded');
    
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) {
        return; // No loading screen on this page
    }
    
    if (hasLoadedBefore) {
        // If already loaded before, hide immediately without display
        loadingScreen.classList.add('hidden');
        loadingScreen.style.display = 'none';
    } else {
        // First load - show loading screen
        loadingScreen.style.display = 'flex';
        
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', function() {
            // Add a small delay for smooth transition
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                // Mark as loaded in session
                sessionStorage.setItem('appLoaded', 'true');
            }, 800);
        });
        
        // Fallback: Hide loading screen after 3 seconds even if load event doesn't fire
        setTimeout(function() {
            if (!loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                sessionStorage.setItem('appLoaded', 'true');
            }
        }, 3000);
    }
})();
