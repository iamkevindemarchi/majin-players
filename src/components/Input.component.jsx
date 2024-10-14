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
}) => {
    const isDarkMode = theme === "dark";

    return (
        <div className="flex flex-col gap-2 desktop:w-auto computer:w-auto phone:w-full">
            <input
                type={type}
                autoFocus={autofocus}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`transition-all duration-200 w-60 px-5 desktop:py-3 computer:py-3 phone:py-5 rounded-lg border-2 outline-none phone:w-full desktop:w-60 computer:w-60 ${
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
