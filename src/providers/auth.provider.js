import { createContext, useState } from "react";

// Utils
import { getFromStorage } from "../utils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storageSession = getFromStorage("session");

    const [session, setSession] = useState(storageSession || null);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};
