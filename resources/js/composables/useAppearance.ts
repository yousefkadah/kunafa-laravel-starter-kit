import { onMounted, ref, computed, watchEffect } from 'vue';

// Add TypeScript declaration for our global window properties
declare global {
    interface Window {
        toggleTheme: () => boolean;
        isTogglingTheme: boolean;
    }
}

type Appearance = 'light' | 'dark' | 'system';

export function updateTheme(value: Appearance) {
    if (typeof window === 'undefined') {
        return;
    }

    // Skip updating if we're already in the middle of a theme toggle
    if (window.isTogglingTheme) return;
    
    const isDark = value === 'dark' || 
                  (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Set flag to prevent recursive calls
    window.isTogglingTheme = true;
    
    // Apply to html element
    document.documentElement.classList.toggle('dark', isDark);
    
    // Also apply to body for extra insurance
    document.body.classList.toggle('dark', isDark);
    
    // Set color-scheme CSS property to help browsers with native elements
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    
    // Force a repaint to ensure the changes take effect immediately
    document.body.style.display = 'none';
    document.body.offsetHeight; // Force a reflow
    document.body.style.display = '';
    
    // Reset flag after the repaint
    setTimeout(() => {
        window.isTogglingTheme = false;
    }, 100);
}

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('appearance') as Appearance | null;
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();

    updateTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    if (typeof window === 'undefined') {
        return;
    }

    // Initialize theme from saved preference or default to system...
    const savedAppearance = getStoredAppearance();
    updateTheme(savedAppearance || 'system');

    // Set up system theme change listener...
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const appearance = ref<Appearance>('system');
    
    // Add computed property for isDarkMode
    const isDarkMode = computed(() => {
        if (typeof window === 'undefined') return false;
        
        // Check the actual DOM state first to ensure we're in sync with other theme toggles
        if (document.documentElement.classList.contains('dark')) {
            return true;
        }
        
        if (appearance.value === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return appearance.value === 'dark';
    });

    onMounted(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;

        if (savedAppearance) {
            appearance.value = savedAppearance;
        }
        
        // Initialize theme on mount with a slight delay to ensure DOM is ready
        setTimeout(() => {
            if (!window.isTogglingTheme) {
                updateTheme(appearance.value);
            }
        }, 50);
        
        // Listen for theme change events from other components
        document.documentElement.addEventListener('themechange', (event: any) => {
            if (window.isTogglingTheme) return;
            
            if (event.detail && event.detail.theme) {
                const newAppearance = event.detail.theme as Appearance;
                if (appearance.value !== newAppearance) {
                    appearance.value = newAppearance;
                }
            }
        });
        
        // Watch for changes to isDarkMode and update HTML element class only if we're not already toggling
        watchEffect(() => {
            if (window.isTogglingTheme) return;
            
            const docIsDark = document.documentElement.classList.contains('dark');
            if (docIsDark !== isDarkMode.value) {
                document.documentElement.classList.toggle('dark', isDarkMode.value);
                document.body.classList.toggle('dark', isDarkMode.value);
            }
        });
    });

    function updateAppearance(value: Appearance) {
        if (window.isTogglingTheme) return;
        
        if (appearance.value !== value) {
            appearance.value = value;
            
            // Store in localStorage for client-side persistence
            localStorage.setItem('appearance', value);
            
            // Store in cookie for SSR
            setCookie('appearance', value);
            
            // Apply theme change immediately
            updateTheme(value);
        }
    }
    
    // Use the global toggleTheme if available
    function toggleTheme() {
        if (window.isTogglingTheme) return;
        
        if (window.toggleTheme) {
            // Use the global function to ensure consistency
            const isDark = window.toggleTheme();
            // Update our local state based on the result
            setTimeout(() => {
                appearance.value = isDark ? 'dark' : 'light';
            }, 150);
        } else {
            // Fallback to local implementation
            const newTheme = isDarkMode.value ? 'light' : 'dark';
            updateAppearance(newTheme);
        }
    }

    return {
        appearance,
        updateAppearance,
        isDarkMode,
        toggleTheme
    };
}
