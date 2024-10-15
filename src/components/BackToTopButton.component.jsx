import React, { useState } from "react";

// Assets
import { ArrowUpIcon } from "../assets/icons";

const BackToTopButton = ({ theme }) => {
    const [state, setState] = useState(false);

    const isDarkMode = theme === "dark";

    function checkScroll() {
        if (!state && window.pageYOffset > 20) setState(true);
        else if (state && window.pageYOffset <= 20) setState(false);
    }

    window.addEventListener("scroll", checkScroll);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
                opacity: state ? ".8" : "0",
                zIndex: state ? "900" : "-900",
            }}
            className={`transition-all duration-200 border-none outline-none p-3 rounded-lg fixed bottom-5 right-4 ${
                isDarkMode ? "bg-darkgray3" : "bg-lightgray3"
            }`}
        >
            <ArrowUpIcon
                className={`transition-all duration-200 text-[2em] ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            />
        </button>
    );
};

export default BackToTopButton;
