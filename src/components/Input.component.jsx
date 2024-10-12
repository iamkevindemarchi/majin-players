import React from "react";

const Input = ({ name, placeholder, theme, value, onChange }) => {
    const isDarkMode = theme === "dark";

    return (
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`transition-all duration-200 w-60 px-5 py-3 rounded-lg border-2 outline-none phone:w-full desktop:w-60 ${
                isDarkMode
                    ? "bg-black border-pink-dark text-white placeholder:text-pink3-dark"
                    : "bg-white border-pink text-black placeholder:text-pink3"
            }`}
        />
    );
};

export default Input;
