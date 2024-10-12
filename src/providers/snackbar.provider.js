import { createContext, useState } from "react";

export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const [state, setState] = useState({
        isActive: false,
        type: "",
        message: "",
    });

    function clearSnackbar() {
        setTimeout(() => {
            setState((prevState) => ({ ...prevState, isActive: false }));
        }, 2000);

        setTimeout(() => {
            setState((prevState) => ({ ...prevState, type: "", message: "" }));
        }, 3000);
    }

    function activeSnackbar(type, message) {
        setState({
            isActive: true,
            type,
            message,
        });

        clearSnackbar();
    }

    return (
        <SnackbarContext.Provider value={{ state, activeSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};
