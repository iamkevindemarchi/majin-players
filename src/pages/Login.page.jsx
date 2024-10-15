import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { AUTH_API } from "../api";

// Assets
import logoImg from "../assets/images/logo.png";
import { ClosedEyeIcon, EyeIcon } from "../assets/icons";

// Components
import { Button, Input } from "../components";

// Contexts
import { AuthContext, LoaderContext, SnackbarContext } from "../providers";

// Utils
import {
    checkEmail,
    checkRequiredField,
    setPageTitle,
    setToStorage,
} from "../utils";

const initialState = {
    email: "",
    password: "",
};

const errorsInitialState = {
    email: {
        value: false,
        message: "",
    },
    password: {
        value: false,
        message: "",
    },
};

const Login = () => {
    const { setSession } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formDataValues, setFormDataValues] = useState(initialState);
    const [passwordType, setPasswordType] = useState("password");
    const [errors, setErrors] = useState(errorsInitialState);
    const { activeSnackbar } = useContext(SnackbarContext);
    const { setIsLoading } = useContext(LoaderContext);

    setPageTitle("Log In");

    function validateForm() {
        const isEmailValid = checkEmail(formDataValues.email);
        const isPasswordValid = checkRequiredField(formDataValues.password);

        setErrors((prevState) => ({
            ...prevState,
            email: {
                value: isEmailValid.value,
                message: isEmailValid.value ? "" : isEmailValid.message,
            },
            password: {
                value: isPasswordValid,
                message: isPasswordValid ? "" : "Campo obbligatorio*",
            },
        }));

        if (!isEmailValid || !isPasswordValid) return false;
        else return true;
    }

    async function loginHandler() {
        setIsLoading(true);

        const isFormValid = validateForm();
        // const res = await AUTH_API.login(
        //     "kevindemarchibusiness@gmail.com",
        //     "MKDema-130499"
        // );
        if (isFormValid) {
            const res = await AUTH_API.login(
                formDataValues.email,
                formDataValues.password
            );

            if (res) {
                setSession(res);
                setToStorage("session", res);
                navigate("/admin");
            } else activeSnackbar("error", "Impossibile effettuare l'accesso");
        }

        setIsLoading(false);
    }

    const logo = (
        <img
            src={logoImg}
            alt="Impossibile visualizzare l'immagine."
            className="w-40 object-contain"
        />
    );

    function inputHandler(event) {
        setFormDataValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    function passwordTypeHandler() {
        const valueToChange = passwordType === "password" ? "text" : "password";
        setPasswordType(valueToChange);
    }

    const form = (
        <form
            style={{
                background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
            className="bg-white desktop:px-[20%] computer:px-[20%] phone:px-[5%] desktop:py-48 computer:py-48 phone:py-20 rounded-3xl flex flex-col gap-5 phone:w-[90%]"
        >
            <Input
                autofocus
                variant="login"
                placeholder="E-mail"
                name="email"
                value={formDataValues.email}
                onChange={inputHandler}
                error={errors.email.message}
            />
            <Input
                type={passwordType}
                autofocus
                variant="login"
                placeholder="Password"
                name="password"
                value={formDataValues.password}
                onChange={inputHandler}
                endIcon={
                    passwordType === "password" ? (
                        <EyeIcon
                            onClick={passwordTypeHandler}
                            className="transition-all duration-200 text-black text-lg cursor-pointer hover:opacity-50"
                        />
                    ) : (
                        <ClosedEyeIcon
                            onClick={passwordTypeHandler}
                            className="transition-all duration-200 text-black text-lg cursor-pointer hover:opacity-50"
                        />
                    )
                }
                error={errors.password.message}
            />
            <Button type="submit" onClick={loginHandler}>
                <span>Accedi</span>
            </Button>
        </form>
    );

    return (
        <div
            style={{
                backgroundImage: `url(${logoImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
            }}
            className="w-full h-[100vh] flex justify-center items-center flex-col desktop:gap-20 computer:gap-20 phone:gap-5 desktop:p-0 computer:p-0 phone:pt-0"
        >
            {logo}
            {form}
        </div>
    );
};

export default Login;
