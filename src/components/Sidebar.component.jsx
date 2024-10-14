import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import logoImg from "../assets/images/logo.png";
import { LogoutIcon, MoonIcon, SunIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

const Sidebar = ({
    isOpen,
    isAdmin,
    routes,
    sidebarHandler,
    theme,
    themeHandler,
    logoutHandler,
}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isDarkMode = theme === "dark";
    const paths = pathname.split("/");
    const section = isAdmin ? paths[2] : paths[1];

    function logoHandler() {
        const path = isAdmin ? "/admin" : "/";
        navigate(path);
        sidebarHandler();
    }

    const logo = (
        <img
            onClick={logoHandler}
            src={logoImg}
            alt="Impossibile visualizzare l'immagine."
            className="w-20 hover:opacity-50 transition-all duration-200 cursor-pointer"
        />
    );

    const routesComponent = (
        <div className="flex flex-col gap-5 items-center justify-around w-[50%]">
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
                            onClick={sidebarHandler}
                            className={`${
                                isActiveRoute && "bg-navbar-btn"
                            } px-5 py-2 rounded-lg transition-all duration-200`}
                        >
                            <span className="text-2xl uppercase font-bold text-primary transition-all duration-200 cursor-pointer">
                                {route.name}
                            </span>
                        </Link>
                    )
                );
            })}
        </div>
    );

    const icons = (
        <div className="flex flex-col gap-20 items-center">
            <IconButton theme={theme} onClick={themeHandler}>
                {theme === "light" ? (
                    <MoonIcon className="text-2xl text-blue" />
                ) : (
                    <SunIcon className="text-2xl text-blue text-white" />
                )}
            </IconButton>
            <button
                onClick={() => {
                    logoutHandler();

                    setTimeout(() => {
                        sidebarHandler();
                    }, 1000);
                }}
            >
                <LogoutIcon
                    className={`text-3xl ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                />
            </button>
        </div>
    );

    return (
        <div
            className={`desktop:hidden computer:hidden phone:flex flex-col gap-10 transition-all duration-200 absolute w-full justify-center items-center h-full z-[950] ${
                isOpen ? "top-0 opacity-100" : "top-[-100%] opacity-[0]"
            } ${isDarkMode ? "bg-black" : "bg-white"}`}
        >
            {logo}
            {routesComponent}
            {icons}
        </div>
    );
};

export default Sidebar;
