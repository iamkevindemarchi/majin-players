import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import logoImg from "../assets/images/logo.png";
import { LogoutIcon, SunIcon, MoonIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

const AdminNavbar = ({ routes, isAdmin, theme, themeHandler, logoutHandler }) => {
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
            className="w-20 hover:opacity-50 cursor-pointer opacity-100 top-0 transition-all duration-200"
        />
    );

    const routesComponent = (
        <div className="flex-row items-center justify-around w-[50%] desktop:flex phone:hidden">
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
                            className={`${
                                isActiveRoute && "bg-navbar-btn"
                            } px-5 py-1 rounded-lg transition-all duration-200`}
                        >
                            <span className="text-lg font-bold text-primary transition-all duration-200 cursor-pointer">
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
            <button onClick={logoutHandler}>
                <LogoutIcon
                    className={`text-2xl ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                />
            </button>
        </div>
    );

    return (
        <div
            className={`h-32 flex flex-row items-center justify-around transition-all duration-200 fixed z-10 w-full ${
                isDarkMode ? "bg-black" : "bg-white"
            }`}
        >
            {logo}
            {routesComponent}
            {icons}
        </div>
    );
};

export default AdminNavbar;
