import React from "react";

const Backdrop = ({ theme, children }) => {
    const isDarkMode = theme === "dark";

    return (
        <div
            className={`fixed z-[999] w-full h-[100vh] flex justify-center items-center top-0 left-0 ${
                isDarkMode ? "bg-backdrop-dark" : "bg-backdrop"
            }`}
        >
            {children}
        </div>
    );
};

export default Backdrop;
