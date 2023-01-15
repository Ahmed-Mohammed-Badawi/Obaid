import React from "react";
import classes from './Buttons.module.scss';
// Imports
import Image from "next/image";


function SubmitButton({buttonText, buttonFunction}) {
    return (
        <button className={classes.Submit_BTN} onClick={buttonFunction}>
            <Image src={"/Icons/SubmitLogin_Icon.svg"} width={16} height={16} alt={"Send Icon"} />
            <span>{buttonText}</span>
        </button>
    );
}

export default SubmitButton;
