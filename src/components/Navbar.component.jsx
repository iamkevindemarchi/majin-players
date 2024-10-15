import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import logoImg from "../assets/images/logo.png";
import { SunIcon, MoonIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

const Navbar = ({ routes, isAdmin, theme, themeHandler, logoutHandler }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isDarkMode = theme === "dark";
    const paths = pathname.split("/");
    const section = isAdmin ? paths[2] : paths[1];

    function logoHandler() {
        const path = isAdmin ? "/admin" : "/";
        navigate(path);
    }

    const logo = (
        <img
            onClick={logoHandler}
            src={logoImg}
            alt="Impossibile visualizzare l'immagine."
            className="transition-all duration-200 desktop:h-[80%] phone:h-[50%] hover:opacity-50 cursor-pointer opacity-100"
        />
    );

    const routesComponent = (
        <div className="flex flex-row items-center gap-3 phone:hidden desktop:block overflow-hidden">
            {routes.map((route) => {
                const pathname = route.path;
                const paths = pathname.split("/");
                const currentSection = isAdmin ? paths[2] : paths[1];
                const isActiveRoute = section === currentSection;
                const isRouteHidden = route.isHidden;

                return (
                    !isRouteHidden &&
                    route.path !== "/admin" && (
                        <Link
                            key={route.path}
                            to={route.path}
                            className="px-5 py-1 rounded-lg"
                        >
                            <span
                                className={`transition-all duration-200 text-lg uppercase font-bold cursor-pointer hover:text-primary font-verdana ${
                                    !isActiveRoute &&
                                    (isDarkMode ? "text-white" : "text-black")
                                } ${isActiveRoute && "text-primary"}`}
                            >
                                {route.name}
                            </span>
                        </Link>
                    )
                );
            })}
        </div>
    );

    const icons = (
        <div className="flex flex-row items-center gap-5 desktop:flex phone:hidden">
            <IconButton theme={theme} onClick={themeHandler}>
                {theme === "light" ? (
                    <MoonIcon className="text-2xl text-black" />
                ) : (
                    <SunIcon className="text-2xl text-white" />
                )}
            </IconButton>
        </div>
    );

    return (
        <div
            className={`transition-all duration-200 flex justify-between items-center desktop:pl-20 desktop:pr-20 phone:pr-0 phone:pl-0 h-36 w-full fixed z-10 ${
                isDarkMode ? "bg-black" : "bg-white"
            }`}
        >
            <div className="w-full h-full flex flex-row gap-5 items-center desktop:justify-start phone:justify-center">
                {logo}
                {routesComponent}
            </div>
            {icons}
        </div>
    );
};

export default Navbar;
