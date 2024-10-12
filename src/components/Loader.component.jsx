import React from "react";
import { DotLoader as Spinner } from "react-spinners";

// Components
import Backdrop from "./Backdrop.component";

const Loader = () => {
    return (
        <Backdrop>
            <Spinner color="#ffffff" />
        </Backdrop>
    );
};

export default Loader;
