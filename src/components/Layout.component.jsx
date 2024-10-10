import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "../routes";

// Api
import { AUTH_API } from "../api";

// Components
import Navbar from "./Navbar.component";
import Hamburger from "./Hamburger.component";
import Sidebar from "./Sidebar.component";

// Contexts
import { SidebarContext, ThemeContext } from "../providers";

// Utils
import { removeFromStorage } from "../utils";

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const firstPath = pathname.split("/")[1];
    const isAdminRoute = firstPath === "admin";
    const { sidebar: isSidebarOpen, sidebarHandler } =
        useContext(SidebarContext);
    const { theme, themeHandler } = useContext(ThemeContext);
    const navigate = useNavigate();

    async function logoutHandler() {
        await AUTH_API.logout();
        removeFromStorage("session");
        navigate("/login");
    }

    const admin = (
        <div>
            <Navbar
                routes={ADMIN_ROUTES}
                isAdmin={isAdminRoute}
                theme={theme}
                themeHandler={themeHandler}
                logoutHandler={logoutHandler}
            />
            <Sidebar
                routes={ADMIN_ROUTES}
                isOpen={isSidebarOpen}
                isAdmin={isAdminRoute}
                sidebarHandler={sidebarHandler}
                theme={theme}
                themeHandler={themeHandler}
                logoutHandler={logoutHandler}
            />
            <Hamburger
                isOpen={isSidebarOpen}
                onClick={sidebarHandler}
                theme={theme}
            />
            {children}
        </div>
    );

    const user = <div>{children}</div>;

    return isAdminRoute ? admin : user;
};

export default Layout;
