import React, { useContext } from "react";

// Assets
import logoImg from "../../assets/images/logo.png";

// Contexts
import { ThemeContext } from "../../providers";

// Utils
import { setPageTitle } from "../../utils";

const Dashboard = () => {
    const { theme } = useContext(ThemeContext);

    const isDarkMode = theme === "dark";

    setPageTitle("Dashboard");

    const image = (
        <img
            src={logoImg}
            className="object-contain desktop:w-[30%] computer:w-[30%] phone:w-[90%]"
            alt="Impossibile visualizzare l'immagine."
        />
    );

    const title = (
        <span
            className={`transition-all duration-200 desktop:text-[5em] computer:text-[5em] phone:text-[3em] font-bold uppercase opacity-50 ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Dashboard
        </span>
    );

    return (
        <div
            className={`transition-all duration-200 flex flex-col gap-10 desktop:pt-48 computer:pt-40 phone:pt-20 justify-center items-center min-h-[100vh] ${
                isDarkMode ? "bg-pink2-dark" : "bg-pink2"
            }`}
        >
            {image}
            {title}
        </div>
    );
};

export default Dashboard;
