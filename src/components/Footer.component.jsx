import React from "react";
import { Link } from "react-router-dom";

// Assets
import {
    EmailIcon,
    InstagramIcon,
    LocationIcon,
    YoTubeIcon,
} from "../assets/icons";

const Footer = ({ theme, routes }) => {
    const isDarkMode = theme === "dark";

    const contacts = (
        <div className="flex flex-col gap-5">
            <span
                className={`transition-all duration-200 text-lg uppercase font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                {process.env.REACT_APP_WEBSITE_NAME}
            </span>
            <a
                href={`mailto: ${process.env.REACT_APP_EMAIL}`}
                className={`transition-all duration-200 flex flex-row items-center gap-1 hover:text-primary ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                <EmailIcon className="text-2xl" />
                <span className="font-bold desktop:text-lg phone:text-md">
                    {process.env.REACT_APP_EMAIL}
                </span>
            </a>
            <div
                className={`transition-all duration-200 flex flex-row items-center gap-1 ${
                    isDarkMode ? "text-lightgray3" : "text-darkgray"
                }`}
            >
                <LocationIcon className="text-2xl" />
                <span className="desktop:text-lg phone:text-md">
                    Italia
                </span>
            </div>
        </div>
    );

    const routesComponent = (
        <div className="flex flex-col gap-5">
            <span
                className={`transition-all duration-200 text-lg uppercase font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                Collegamenti
            </span>
            <div className="flex flex-col gap-1 desktop:text-center phone:text-left">
                {routes.map(
                    (route) =>
                        !route.isHidden && (
                            <Link
                                key={route.path}
                                to={route.path}
                                className={`transition-all duration-200 text-md ${
                                    isDarkMode
                                        ? "text-lightgray3"
                                        : "text-darkgray"
                                } hover:text-primary`}
                            >
                                {route.name}
                            </Link>
                        )
                )}
            </div>
        </div>
    );

    const Social = ({ link, icon }) => (
        <div className="flex flex-row justify-around">
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={`transition-all duration-200 p-3 flex justify-center items-center rounded-full border-2 border-primary hover:text-primary ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                {icon}
            </a>
        </div>
    );

    const social = (
        <div className="flex flex-col gap-5">
            <span
                className={`transition-all duration-200 text-lg uppercase font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                Social
            </span>
            <div className="flex flex-row gap-5">
                <Social
                    link="https://www.instagram.com/majin.players/"
                    icon={<InstagramIcon className="text-2xl" />}
                />
                <Social
                    link="https://www.youtube.com/@majin.players"
                    icon={<YoTubeIcon className="text-2xl" />}
                />
            </div>
        </div>
    );

    const columns = (
        <div className="flex desktop:flex-row phone:flex-col desktop:gap-0 phone:gap-10 justify-between">
            {contacts}
            {routesComponent}
            {social}
        </div>
    );

    const copyright = (
        <span
            className={`transition-all duration-200 desktop:text-md phone:text-sm desktop:text-left phone:text-center ${
                isDarkMode ? "text-lightgray3" : "text-darkgray"
            }`}
        >
            {`@ 2024 - ${process.env.REACT_APP_WEBSITE_NAME}, made by
            Kevin De Marchi - All rights reserved`}
        </span>
    );

    return (
        <div
            className={`transition-all duration-200 absolute bottom-0 desktop:px-40 phone:px-5 w-full pt-20 pb-10 flex flex-col gap-10 ${
                isDarkMode ? "bg-black" : "bg-white"
            }`}
        >
            {columns}
            {copyright}
        </div>
    );
};

export default Footer;
