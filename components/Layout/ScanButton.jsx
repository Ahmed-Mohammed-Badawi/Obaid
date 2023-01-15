import React from "react";
import Image from "next/image";
import classes from './Buttons.module.scss';

function ScanButton({submit_function}) {

    return (
        <button type="button" className={classes.Scan_BTN} onClick={submit_function}>
            <Image
                src={"/Icons/Scanner_Black.svg"}
                width={16}
                height={16}
                alt={"Send Icon"}
            />
            <span>Scan</span>
        </button>
    );
}

export default ScanButton;
