import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Assets
import "./index.css";

// Components
import App from "./App";

// Providers
import {
    AuthProvider,
    ThemeProvider,
    SidebarProvider,
    LoaderProvider,
    SnackbarProvider,
} from "./providers";

const root = createRoot(document.getElementById("root"));

const app = (
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <SidebarProvider>
                    <LoaderProvider>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </LoaderProvider>
                </SidebarProvider>
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
);

root.render(app);
