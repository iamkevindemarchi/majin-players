import { createContext, useState } from "react";

export const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);

    function sidebarHandler() {
        setSidebar(!sidebar);
    }

    return (
        <SidebarContext.Provider value={{ sidebar, sidebarHandler }}>
            {children}
        </SidebarContext.Provider>
    );
};
