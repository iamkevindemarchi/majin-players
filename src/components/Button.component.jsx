import React from "react";

const Button = ({ type, onClick, variant, theme, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`transition-all duration-200 px-8 phone:py-3 rounded-3xl flex flex-row gap-2 items-center hover:opacity-50 ${
                variant === "cancel"
                    ? "bg-transparent border-2 border-primary text-primary"
                    : "bg-primary text-white"
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
