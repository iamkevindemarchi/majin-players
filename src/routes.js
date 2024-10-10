// Pages
import { Dashboard } from "./pages/admin";
import { Login } from "./pages";

export const ADMIN_ROUTES = [{ path: "/admin", element: <Dashboard /> }];

export const ROUTES = [{ path: "/login", element: <Login /> }];
