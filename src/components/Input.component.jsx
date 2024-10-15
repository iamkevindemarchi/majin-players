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
    variant,
    endIcon,
}) => {
    const isDarkMode = theme === "dark";
    const isLoginVariant = variant === "login";

    return (
        <div
            className={`flex flex-col gap-2 desktop:w-auto computer:w-auto phone:w-full relative ${className}`}
        >
            <input
                type={type}
                autoFocus={autofocus}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`transition-all duration-200 w-full px-5 desktop:py-3 computer:py-3 phone:py-5 rounded-lg border-2 outline-none ${
                    !isLoginVariant &&
                    (isDarkMode
                        ? "bg-black border-pink-dark text-white placeholder:text-pink3-dark"
                        : "bg-white border-pink text-black placeholder:text-pink3")
                } ${
                    isLoginVariant &&
                    "text-black placeholder:text-black border-none"
                } ${endIcon && "pr-10"}`}
            />
            {endIcon && (
                <div className="absolute right-4 desktop:top-[18px] computer:top-[18px] phone:top-[22px]">{endIcon}</div>
            )}
            {error && <span className="text-red text-sm">{error}</span>}
        </div>
    );
};

export default Input;
