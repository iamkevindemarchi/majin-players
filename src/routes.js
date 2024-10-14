// Pages
import { Dashboard, AdminRoster, AdminPlayer } from "./pages/admin";
import { Login } from "./pages";

export const ADMIN_ROUTES = [
    { path: "/admin", element: <Dashboard />, name: "Home" },
    { path: "/admin/roster", element: <AdminRoster />, name: "Roster" },
    {
        path: "/admin/roster/new",
        element: <AdminPlayer />,
        name: "Nuovo giocatore",
        isHidden: true,
    },
    {
        path: "/admin/roster/edit/:playerId",
        element: <AdminPlayer />,
        name: "Modifica giocatore",
        isHidden: true,
    },
    { path: "/admin/sponsor", element: <Dashboard />, name: "Sponsor" },
    {
        path: "/admin/equipment",
        element: <Dashboard />,
        name: "Equipaggiamento",
    },
];

export const ROUTES = [{ path: "/login", element: <Login /> }];
