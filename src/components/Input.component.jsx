import React from "react";

const Input = ({
    type,
    autofocus,
    name,
    placeholder,
    theme,
    value,
    onChange,
    error,
    className,
}) => {
    const isDarkMode = theme === "dark";

    return (
        <div className={`flex flex-col gap-2 desktop:w-auto computer:w-auto phone:w-full ${className}`}>
            <input
                type={type}
                autoFocus={autofocus}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`transition-all duration-200 w-full px-5 desktop:py-3 computer:py-3 phone:py-5 rounded-lg border-2 outline-none  ${
                    isDarkMode
                        ? "bg-black border-pink-dark text-white placeholder:text-pink3-dark"
                        : "bg-white border-pink text-black placeholder:text-pink3"
                }`}
            />
            {error && <span className="text-red text-sm">{error}</span>}
        </div>
    );
};

export default Input;
