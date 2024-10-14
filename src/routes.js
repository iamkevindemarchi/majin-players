// Pages
import {
    Dashboard,
    AdminRoster,
    AdminPlayer,
    AdminSponsors,
    AdminSponsor,
} from "./pages/admin";
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
    { path: "/admin/sponsor", element: <AdminSponsors />, name: "Sponsor" },
    {
        path: "/admin/sponsor/new",
        element: <AdminSponsor />,
        name: "Nuovo sponsor",
        isHidden: true,
    },
    {
        path: "/admin/sponsor/edit/:sponsorId",
        element: <AdminSponsor />,
        name: "Modifica sponsor",
        isHidden: true,
    },
    {
        path: "/admin/equipment",
        element: <Dashboard />,
        name: "Equipaggiamento",
    },
];

export const ROUTES = [{ path: "/login", element: <Login /> }];
