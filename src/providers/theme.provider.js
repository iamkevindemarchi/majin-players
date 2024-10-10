import { createContext, useState } from "react";

// Utils
import { getFromStorage, setToStorage } from "../utils";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const storageTheme = getFromStorage("theme");

    const [theme, setTheme] = useState(storageTheme || "light");

    function themeHandler() {
        const changedTheme = theme === "light" ? "dark" : "light";
        setTheme(changedTheme);
        setToStorage("theme", changedTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeHandler }}>
            {children}
        </ThemeContext.Provider>
    );
};
