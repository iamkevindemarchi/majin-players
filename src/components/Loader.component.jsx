import React from "react";
import { DotLoader as Spinner } from "react-spinners";

// Components
import Backdrop from "./Backdrop.component";

const Loader = ({ theme }) => {
    return (
        <Backdrop theme={theme}>
            <Spinner color="#ffffff" />
        </Backdrop>
    );
};

export default Loader;
