import React, { useRef } from "react";

// Components
import Backdrop from "./Backdrop.component";
import Button from "./Button.component";

// Hooks
import { useClickOutside } from "../hooks/useClickOutside";

const Modal = ({
    title,
    isOpen,
    children,
    submitLabel = "Sì",
    cancelLabel = "No",
    onSubmit,
    onClose,
}) => {
    const componentRef = useRef();

    const titleComponent = (
        <span className="font-bold uppercase text-xl">{title}</span>
    );

    useClickOutside(componentRef, () => onClose());

    return (
        isOpen && (
            <Backdrop pointer>
                <div
                    ref={componentRef}
                    className="desktop:w-[25%] phone:w-[90%] p-10 bg-white rounded-3xl flex flex-col gap-5 cursor-auto"
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
