import React, { useContext, useEffect } from "react";

// Assets
import { InstagramIcon, YoTubeIcon } from "../assets/icons";

// Contexts
import { ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Socials = () => {
    const { theme } = useContext(ThemeContext);

    setPageTitle("Social");

    const isDarkMode = theme === "dark";

    const title = (
        <span
            className={`transition-all duration-200 desktop:text-[3em] phone:text-[2em] font-bold uppercase font-montserrat-bold ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Social
        </span>
    );

    const Social = ({ icon, label, link }) => (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`transition-all duration-200 flex flex-row gap-5 items-center justify-center desktop:text-[2.5em] phone:text-[2em] border-2 border-primary w-full bg-navbar-btn rounded-full py-3 cursor-pointer hover:opacity-50 ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            {icon}
            <span className="uppercase font-montserrat-bold">{label}</span>
        </a>
    );

    const social = (
        <div className="flex flex-col w-full gap-10">
            <Social
                icon={<InstagramIcon />}
                label="Instagram"
                link="https://www.instagram.com/majin.players/"
            />
            <Social
                link="https://www.youtube.com/@majin.players"
                label="YouTube"
                icon={<YoTubeIcon />}
            />
        </div>
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-32 phone:gap-20">
            {title}
            {social}
        </div>
    );
};

export default Socials;
