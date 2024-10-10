import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ADMIN_ROUTES } from "../routes";

// Components
import Navbar from "./Navbar.component";
import Hamburger from "./Hamburger.component";

// Contexts
import { SidebarContext } from "../providers";

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const firstPath = pathname.split("/")[1];
    const isAdminRoute = firstPath === "admin";
    const { sidebar: isSidebarOpen, sidebarHandler } =
        useContext(SidebarContext);

    const admin = (
        <div>
            <Navbar routes={ADMIN_ROUTES} isAdmin={isAdminRoute} />
            <Hamburger isOpen={isSidebarOpen} onClick={sidebarHandler} />
            {children}
        </div>
    );

    const user = <div>{children}</div>;

    return isAdminRoute ? admin : user;
};

export default Layout;
