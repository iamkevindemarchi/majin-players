import { createContext, useState } from "react";

export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
