import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_ROUTES } from "../routes";

// Components
import Navbar from "./Navbar.component";
import Hamburger from "./Hamburger.component";

// Contexts
import { SidebarContext, ThemeContext } from "../providers";

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const firstPath = pathname.split("/")[1];
    const isAdminRoute = firstPath === "admin";
    const { sidebar: isSidebarOpen, sidebarHandler } =
        useContext(SidebarContext);
    const { theme, themeHandler } = useContext(ThemeContext);

    const admin = (
        <div>
            <Navbar
                routes={ADMIN_ROUTES}
                isAdmin={isAdminRoute}
                theme={theme}
                themeHandler={themeHandler}
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
