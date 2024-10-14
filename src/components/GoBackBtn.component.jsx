import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import { BackIcon } from "../assets/icons";

const GoBackBtn = ({ theme }) => {
    const navigate = useNavigate();

    const isDarkMode = theme === "dark";

    function goBackHandler() {
        navigate(-1);
    }

    return (
        <div>
            <button
                onClick={goBackHandler}
                className={`transition-all duration-200 rounded-3xl flex justify-center items-center gap-2 px-5 py-2 text-primary ${
                    isDarkMode ? "hover:bg-pink-dark" : "hover:bg-pink"
                }`}
            >
                <BackIcon className="text-2xl" />
                Torna indietro
            </button>
        </div>
    );
};

export default GoBackBtn;
