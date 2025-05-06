import { useEffect, useState } from "react";
import "./ThemeToggle.css"
function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Apply the theme to the html element
        document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            aria-label="Toggle theme"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
export default ThemeToggle