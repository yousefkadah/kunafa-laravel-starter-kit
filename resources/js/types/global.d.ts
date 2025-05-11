// Add TypeScript declaration for our global window properties
declare global {
    interface Window {
        toggleTheme: () => boolean;
        toggleDarkMode: () => boolean;
        isTogglingTheme: boolean;
        _darkModeObserver?: MutationObserver;
    }
}