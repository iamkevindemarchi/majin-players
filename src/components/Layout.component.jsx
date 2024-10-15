import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "../routes";

// Api
import { AUTH_API } from "../api";

// Components
import AdminNavbar from "./AdminNavbar.component";
import Hamburger from "./Hamburger.component";
import Sidebar from "./Sidebar.component";
import Loader from "./Loader.component";
import Snackbar from "./Snackbar.component";
import Navbar from "./Navbar.component";
import Footer from "./Footer.component";

// Contexts
import {
    LoaderContext,
    SidebarContext,
    SnackbarContext,
    ThemeContext,
} from "../providers";

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
    const { isLoading } = useContext(LoaderContext);
    const {
        state: {
            isActive: isSnackbarActive,
            type: snackbarType,
            message: snackbarMessage,
        },
    } = useContext(SnackbarContext);

    const isLoginPage = pathname === "/login";
    const isDarkMode = theme === "dark";

    const snackbar = (
        <Snackbar
            isOpen={isSnackbarActive}
            message={snackbarMessage}
            type={snackbarType}
            theme={theme}
        />
    );

    async function logoutHandler() {
        await AUTH_API.logout();
        removeFromStorage("session");
        navigate("/login");
    }

    const admin = (
        <div>
            <AdminNavbar
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
            <div className="relative">{children}</div>
        </div>
    );

    const user = (
        <div
            className="transition-all duration-200 relative desktop:pb-[50vh] computer:pb-[50vh] phone:pb-[100vh]"
            style={{
                background: `linear-gradient(360deg, #c86476 20%, ${
                    isDarkMode ? "#000000" : "#ffffff"
                } 70%)`,
            }}
        >
            {!isLoginPage && (
                <Navbar
                    routes={ROUTES}
                    isAdmin={isAdminRoute}
                    theme={theme}
                    themeHandler={themeHandler}
                    logoutHandler={logoutHandler}
                />
            )}
            {!isLoginPage && (
                <Hamburger
                    isOpen={isSidebarOpen}
                    onClick={sidebarHandler}
                    theme={theme}
                />
            )}
            <Sidebar
                routes={ROUTES}
                isOpen={isSidebarOpen}
                isAdmin={isAdminRoute}
                sidebarHandler={sidebarHandler}
                theme={theme}
                themeHandler={themeHandler}
                logoutHandler={logoutHandler}
            />
            {children}
            {!isLoginPage && <Footer theme={theme} routes={ROUTES} />}
        </div>
    );

    return (
        <>
            {isLoading && <Loader />}
            {snackbar}
            {isAdminRoute ? admin : user}
        </>
    );
};

export default Layout;
