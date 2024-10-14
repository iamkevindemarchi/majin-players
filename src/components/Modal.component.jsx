import React, { useRef } from "react";

// Components
import Backdrop from "./Backdrop.component";
import Button from "./Button.component";

const Modal = ({
    title,
    isOpen,
    children,
    submitLabel = "Sì",
    cancelLabel = "No",
    onSubmit,
    onClose,
    theme,
}) => {
    const componentRef = useRef();

    const isDarkMode = theme === "dark";

    const titleComponent = (
        <span
            className={`transition-all duration-200 font-bold uppercase text-xl ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            {title}
        </span>
    );

    return (
        isOpen && (
            <Backdrop theme={theme}>
                <div
                    ref={componentRef}
                    className={`transition-all duration-200 desktop:w-[35%] computer:w-[35%] phone:w-[90%] p-10 rounded-3xl flex flex-col gap-5 cursor-auto ${
                        isDarkMode ? "bg-black" : "bg-white"
                    }`}
                >
                    {titleComponent}
                    {children}
                    <div className="flex justify-end gap-5">
                        <Button onClick={onSubmit}>{submitLabel}</Button>
                        <Button variant="cancel" onClick={onClose}>
                            {cancelLabel}
                        </Button>
                    </div>
                </div>
            </Backdrop>
        )
    );
};

export default Modal;
