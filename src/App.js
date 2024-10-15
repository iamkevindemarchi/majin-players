import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "./routes";

// Components
import { Layout } from "./components";

// Contexts
import { AuthContext } from "./providers";

const App = () => {
    const { session } = useContext(AuthContext);
    const { pathname } = useLocation();

    const ProtectedRoute = ({ children }) => {
        if (!session) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Layout>
            <Routes>
                {ADMIN_ROUTES.map((adminRoute) => (
                    <Route
                        key={adminRoute.path}
                        path={adminRoute.path}
                        element={
                            <ProtectedRoute>
                                {adminRoute.element}
                            </ProtectedRoute>
                        }
                    />
                ))}
                {ROUTES.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
