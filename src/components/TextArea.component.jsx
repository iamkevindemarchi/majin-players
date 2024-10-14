import React from "react";

const TextArea = ({ autofocus, name, placeholder, theme, value, onChange }) => {
    const isDarkMode = theme === "dark";

    return (
        <textarea
            autoFocus={autofocus}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`transition-all duration-200 w-full px-5 py-3 min-h-40 rounded-lg border-2 outline-none ${
                isDarkMode
                    ? "bg-black border-pink-dark text-white placeholder:text-pink3-dark"
                    : "bg-white border-pink text-black placeholder:text-pink3"
            }`}
        />
    );
};

export default TextArea;
