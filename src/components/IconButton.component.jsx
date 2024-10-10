import React from "react";

const IconButton = ({ onClick, theme, children }) => {
    console.log("🚀 ~ theme:", theme);
    return (
        <button
            onClick={onClick}
            className={`p-3 rounded-full flex justify-center items-center hover:opacity-50 transition-all duration-200 ${
                theme === "dark" ? "bg-darkgray" : "bg-lightgray"
            }`}
        >
            {children}
        </button>
    );
};

export default IconButton;
