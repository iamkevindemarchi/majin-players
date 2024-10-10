import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "./routes";

// Components
import { Layout } from "./components";

// Contexts
import { AuthContext } from "./providers";

const App = () => {
    const { session } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!session) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    return (
        <Layout>
            <Routes>
                {ADMIN_ROUTES.map((adminRoute) => (
                    <Route
                        path={adminRoute.path}
                        element={
                            <ProtectedRoute>
                                {adminRoute.element}
                            </ProtectedRoute>
                        }
                    />
                ))}
                {ROUTES.map((route) => (
                    <Route path={route.path} element={route.element} />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
