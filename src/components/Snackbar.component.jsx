import React from "react";

// Assets
import { ErrorIcon, VerifiedIcon } from "../assets/icons";

const Snackbar = ({ isOpen, message, type, theme }) => {
    const isDarkMode = theme === "dark";

    const successClassName = isDarkMode
        ? "bg-green-dark"
        : type === "success" && "bg-green";
    const errorClassName = isDarkMode
        ? "bg-red-dark"
        : type === "error" && "bg-red";

    const isSuccess = type === "success";
    const isError = type === "error";

    return (
        <div
            className={`transition-all duration-200 top-5 fixed z-[999] p-5 desktop:max-w-[50%] desktop:min-w-[auto] phone:min-w-full ${
                isOpen
                    ? "opacity-100 desktop:right-10 phone:right-0"
                    : "right-[-150px] opacity-0"
            }`}
        >
            <div
                className={`text-white px-10 py-3 rounded-full flex flex-row items-center gap-2 ${
                    isSuccess && successClassName
                } ${isError && errorClassName}`}
            >
                {isError && <ErrorIcon className="text-2xl" />}
                {isSuccess && <VerifiedIcon className="text-2xl" />}
                {message}
            </div>
        </div>
    );
};

export default Snackbar;
