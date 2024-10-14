import React from "react";

const Backdrop = ({ pointer, children }) => {
    return (
        <div
            className={`fixed z-[999] bg-backdrop w-full h-[100vh] flex justify-center items-center top-0 left-0 ${
                pointer && "cursor-pointer"
            }`}
        >
            {children}
        </div>
    );
};

export default Backdrop;
