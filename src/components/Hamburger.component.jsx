import React from "react";

const Hamburger = ({ isOpen, onClick, theme }) => {
    const isDarkMode = theme === "dark";

    const lines = [1, 2, 3].map((line) => (
        <div
            key={line}
            className={`w-full h-[0.25em] relative origin-top-[1px] first:rotate-0 even:opacity-100 even:translate-x-0 last:rotate-0 transition-all duration-200 ${
                isOpen &&
                "bg-primary first:rotate-45 even:opacity-[0] even:translate-x-20 last:rotate-[-45deg] origin-[1px]"
            }
            ${isDarkMode ? "bg-white" : "bg-black"}`}
        />
    ));

    return (
        <div
            onClick={onClick}
            className={`desktop:hidden computer:hidden phone:flex fixed top-[7%] left-[7%] flex-col justify-around w-[2em] h-[2em] z-[980]`}
        >
            {lines}
        </div>
    );
};

export default Hamburger;
