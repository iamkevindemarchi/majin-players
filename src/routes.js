// Pages
import { Dashboard, AdminRoster } from "./pages/admin";
import { Login } from "./pages";

export const ADMIN_ROUTES = [
    { path: "/admin", element: <Dashboard />, name: "Home" },
    { path: "/admin/roster", element: <AdminRoster />, name: "Roster" },
    { path: "/admin/sponsor", element: <Dashboard />, name: "Sponsor" },
    {
        path: "/admin/equipment",
        element: <Dashboard />,
        name: "Equipaggiamento",
    },
];

export const ROUTES = [{ path: "/login", element: <Login /> }];
