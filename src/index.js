import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Assets
import "./index.css";

// Components
import App from "./App";

// Providers
import { AuthProvider } from "./providers";

const root = createRoot(document.getElementById("root"));

const app = (
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);

root.render(app);
