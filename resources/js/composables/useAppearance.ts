import { onMounted, ref, computed, watchEffect } from 'vue';

type Appearance = 'light' | 'dark' | 'system';

export function updateTheme(value: Appearance) {
    if (typeof window === 'undefined') {
        return;
    }

    const isDark = value === 'dark' || 
                  (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Apply to html element
    document.documentElement.classList.toggle('dark', isDark);
    
    // Also apply to body for extra insurance
    document.body.classList.toggle('dark', isDark);
    
    // Force a repaint to ensure the changes take effect immediately
    document.body.style.display = 'none';
    document.body.offsetHeight; // Force a reflow
    document.body.style.display = '';
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
            updateTheme(appearance.value);
        }, 0);
        
        // Watch for changes to isDarkMode and update HTML element class
        watchEffect(() => {
            document.documentElement.classList.toggle('dark', isDarkMode.value);
            document.body.classList.toggle('dark', isDarkMode.value);
        });
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', value);

        // Store in cookie for SSR...
        setCookie('appearance', value);

        // Apply theme change immediately and force a repaint
        updateTheme(value);
        
        // Dispatch a custom event that can be used to trigger updates in components
        window.dispatchEvent(new CustomEvent('appearance-changed', { detail: { appearance: value } }));
    }
    
    // Add toggleTheme function
    function toggleTheme() {
        const newTheme = isDarkMode.value ? 'light' : 'dark';
        updateAppearance(newTheme);
    }

    return {
        appearance,
        updateAppearance,
        isDarkMode,
        toggleTheme
    };
}
