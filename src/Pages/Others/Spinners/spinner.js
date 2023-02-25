import React from "react";
import { SpinnerDotted } from "spinners-react";

const Spinner = ({spinner}) => {
    return (
        <SpinnerCircular size={70} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
    )
}

export default Spinner;
