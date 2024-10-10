import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../api";

// Assets
import logoImg from "../assets/images/logo.png";
import { LogoutIcon, SunIcon, MoonIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

// Contexts
import { ThemeContext } from "../providers";

// Utils
import { removeFromStorage } from "../utils";

const Navbar = ({ routes, isAdmin }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { theme, themeHandler } = useContext(ThemeContext);

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
            className="w-20 hover:opacity-50 transition-all duration-200 cursor-pointer"
        />
    );

    const routesComponent = (
        <div className="flex-row items-center justify-around w-[50%] desktop:flex phone:hidden">
            {routes.map((route) => {
                const pathname = route.path;
                const paths = pathname.split("/");
                const currentSection = isAdmin ? paths[2] : paths[1];
                const isActiveRoute = section === currentSection;

                return (
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

    async function logoutHandler() {
        await AUTH_API.logout();
        removeFromStorage(`${process.env.REACT_APP_WEBSITE}-session`);
        navigate("/login");
    }

    const icons = (
        <div className="flex flex-row items-center gap-5 desktop:flex phone:hidden">
            <IconButton theme={theme} onClick={themeHandler}>
                {theme === "light" ? (
                    <MoonIcon className="text-2xl text-blue" />
                ) : (
                    <SunIcon className="text-2xl text-blue text-white" />
                )}
            </IconButton>
            <button onClick={logoutHandler}>
                <LogoutIcon
                    className={`text-2xl ${
                        theme === "dark" ? "text-white" : "text-black"
                    }`}
                />
            </button>
        </div>
    );

    return (
        <div
            className={`h-32 flex flex-row items-center justify-around transition-all duration-200 fixed w-full ${
                theme === "dark" ? "bg-black" : "bg-white"
            }`}
        >
            {logo}
            {routesComponent}
            {icons}
        </div>
    );
};

export default Navbar;
