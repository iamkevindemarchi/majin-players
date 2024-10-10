import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../api";

// Contexts
import { AuthContext } from "../providers";

// Utils
import { setPageTitle, setToStorage } from "../utils";

const Login = () => {
    const { setSession } = useContext(AuthContext);
    const navigate = useNavigate();

    setPageTitle("Log In");

    async function loginHandler() {
        const res = await AUTH_API.login(
            "kevindemarchibusiness@gmail.com",
            "MKDema-130499"
        );
        setSession(res);
        setToStorage("session", res);
        navigate("/admin");
    }

    return (
        <span>
            Non loggato...<button onClick={loginHandler}>Accedi</button>
        </span>
    );
};

export default Login;
