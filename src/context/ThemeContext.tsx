import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme');
        return (stored as Theme) || 'system';
    });

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;

        const checkSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

        const applyTheme = () => {
            let dark = false;

            if (theme === 'system') {
                dark = checkSystemTheme();
            } else {
                dark = theme === 'dark';
            }

            setIsDark(dark);

            if (dark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();

        localStorage.setItem('theme', theme);

        // Listen for system changes if theme is 'system'
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme();
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

    }, [theme]);

    const setTheme = (t: Theme) => {
        setThemeState(t);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
