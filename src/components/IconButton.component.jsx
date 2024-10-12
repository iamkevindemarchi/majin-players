import React from "react";

const IconButton = ({ onClick, theme, variant, children }) => {
    const isDarkMode = theme === "dark";

    const isAdd = variant === "add";
    const addClassName = `w-14 h-14 fixed text-3xl text-white desktop:right-20 desktop:bottom-20 phone:right-5 phone:bottom-5 z-[500] outline-none border-none ${
        isDarkMode ? "bg-green-dark" : "bg-green"
    }`;

    return (
        <button
            onClick={onClick}
            className={`transition-all duration-200 p-3 rounded-full flex justify-center items-center hover:opacity-50 ${
                !isAdd && (isDarkMode ? "bg-darkgray" : "bg-lightgray")
            } ${isAdd && addClassName}`}
        >
            {children}
        </button>
    );
};

export default IconButton;
