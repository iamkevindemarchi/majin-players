import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Assets
import "./index.css";

// Components
import App from "./App";

const root = createRoot(document.getElementById("root"));

const app = (
    <StrictMode>
        <App />
    </StrictMode>
);

root.render(app);
