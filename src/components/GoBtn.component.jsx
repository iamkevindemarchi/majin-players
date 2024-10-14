import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import { BackIcon } from "../assets/icons";

const GoBtn = ({ theme, page, label }) => {
    const navigate = useNavigate();

    const isDarkMode = theme === "dark";

    function pageHandler() {
        navigate(page);
    }

    return (
        <div>
            <button
                onClick={pageHandler}
                className={`transition-all duration-200 rounded-3xl flex justify-center items-center gap-2 px-5 py-2 text-primary ${
                    isDarkMode ? "hover:bg-pink-dark" : "hover:bg-pink"
                }`}
            >
                <BackIcon className="text-2xl" />
                {label}
            </button>
        </div>
    );
};

export default GoBtn;
