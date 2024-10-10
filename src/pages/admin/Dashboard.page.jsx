import React from "react";
import { useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../../api";

// Utils
import { removeFromStorage, setPageTitle } from "../../utils";

const Dashboard = () => {
    const navigate = useNavigate();

    setPageTitle("Dashboard");

    async function logoutHandler() {
        await AUTH_API.logout();
        removeFromStorage(`${process.env.REACT_APP_WEBSITE}-session`);
        navigate("/login");
    }

    return (
        <span>
            Logged in!<button onClick={logoutHandler}>Esci</button>
        </span>
    );
};

export default Dashboard;
