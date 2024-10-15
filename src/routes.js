// Pages
import {
    Dashboard,
    AdminRoster,
    AdminPlayer,
    AdminSponsors,
    AdminSponsor,
    AdminEquipments,
    AdminEquipment,
} from "./pages/admin";
import { Login, Home } from "./pages";

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
        element: <AdminEquipments />,
        name: "Equipaggiamento",
    },
    {
        path: "/admin/equipment/new",
        element: <AdminEquipment />,
        name: "Nuovo equipaggiamento",
        isHidden: true,
    },
    {
        path: "/admin/equipment/edit/:equipmentId",
        element: <AdminEquipment />,
        name: "Modifica equipaggiamento",
        isHidden: true,
    },
];

export const ROUTES = [
    { path: "/login", element: <Login />, name: "Log In", isHidden: true },
    { path: "/", element: <Home />, name: "Home", isHidden: true },
    { path: "/roster", element: <Home />, name: "Roster" },
    { path: "/equipment", element: <Home />, name: "Equipaggiamento" },
    { path: "/sponsor", element: <Home />, name: "Sponsor" },
    { path: "/social", element: <Home />, name: "Social" },
];
