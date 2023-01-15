import Head from "next/head";
import React from "react";
import App from "../components/Scanner/App";

function scan() {
    return (
        <>
            <Head>
                <title>Scan</title>
                <meta
                    name='description'
                    content='Scan your barcode or upload an image'
                />
            </Head>
            <App />
        </>
    );
}

export default scan;