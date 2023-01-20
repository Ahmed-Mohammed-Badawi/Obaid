import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "../components/Pages/product.module.scss";
// IMPORTS
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Notifications
import { toast } from "react-toastify";

function Product() {
    // router
    const router = useRouter();

    //  init Redux
    const dispatch = useDispatch();
    const { code: ReduxCode } = useSelector((state) => state.layout);

    // State
    const [data, setData] = useState();

    // Get the item Data Function from the server with it's code
    async function getTheData(searchCode) {
        axios
            .get(`${process.env.NEXT_PUBLIC_GET_PRODUCT_ENDPOINT}`, {
                params: {
                    itemBarcode: searchCode,
                },
            })
            .then((res) => {
                // check if the data came
                if (res.data.success && res.data.item) {
                    // Add the Array of Values in the state
                    setData(res.data.item.rows[0]);
                }
                // return the response data
                return res.data;
            })
            .catch((err) => {
                // Check the message error
                let message = err.response?.data?.message
                    ? err.response.data.message
                    : err.message;

                // If the message has invalid identifier change the error message
                if (message.includes("invalid identifier")) {
                    message = "This code has no data";
                }
                // Notification
                toast.error(`${message} 😢`);
                // Check if Asset doesn't exist redirect to creatpage
                if (
                    message.includes("Asset does not exist!") ||
                    message.includes("This code has no data")
                ) {
                    // redirect to the create page
                    router.push("/");
                } else {
                    // if any another error redirect to scan page
                    router.push("/");
                }
            });
    }

    // Get the Data
    useEffect(() => {
        // Code from url query
        const { itemBarcode: queryCode } = router.query;
        // check if the code is exist in redux or query
        if (ReduxCode) {
            // get the data of item based on the code
            getTheData(ReduxCode);
        } else if (queryCode) {
            // get the data of item based on the code
            getTheData(queryCode);
        }
    }, [router, ReduxCode]);

    return (
        <>
            <Head>
                <title>Product</title>
                <meta
                    name={"description"}
                    content={`This Page is allow ing you to check and update the product`}
                />
            </Head>
            <div className={classes.Product}>
                <div className={classes.Content}>
                    <section className={classes.Image}>
                        <div className={classes.Image_Container}>
                            <Image
                                src={"/test_2.jpg"}
                                alt='Image'
                                width={678}
                                height={400}
                                objectFit='cover'
                                objectPosition={"center"}
                            />
                        </div>
                    </section>
                    <section className={classes.Data}>
                        <div className={classes.Btn_Container}>
                            <button onClick={() => router.push('/')}>
                                <Image
                                    src={"/Icons/Scanner_Black.svg"}
                                    alt='icon'
                                    width={30}
                                    height={30}
                                />
                            </button>
                        </div>
                        <div className={classes.Info}>
                            <h1 className={classes.Title}>
                                <span className={classes.Span_EN}>
                                    Item Name
                                </span>{" "}
                                <span className={classes.Span_Image}>
                                    <Image
                                        src={"/Icons/two_arrows.svg"}
                                        alt='icon'
                                        width={30}
                                        height={30}
                                    />
                                </span>{" "}
                                <span className={classes.Span_AR}>
                                    اسم المنتج
                                </span>
                            </h1>
                            <div className={classes.Description}>
                                <p>
                                    بيتزا بالفراخ{" "}
                                    <Image
                                        src={"/Icons/Done.svg"}
                                        width={24}
                                        height={24}
                                        alt='done'
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={classes.Info}>
                            <h1 className={classes.Title}>
                                <span className={classes.Span_EN}>
                                    Item Price
                                </span>{" "}
                                <span className={classes.Span_Image}>
                                    <Image
                                        src={"/Icons/two_arrows.svg"}
                                        alt='icon'
                                        width={30}
                                        height={30}
                                    />
                                </span>{" "}
                                <span className={classes.Span_AR}>
                                    سعر المنتج
                                </span>
                            </h1>
                            <div className={classes.Description}>
                                <p>
                                    25{" "}
                                    <Image
                                        src={"/Icons/Done.svg"}
                                        width={24}
                                        height={24}
                                        alt='done'
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={classes.Info}>
                            <h1 className={classes.Title}>
                                <span className={classes.Span_EN}>
                                    Description
                                </span>{" "}
                                <span className={classes.Span_Image}>
                                    <Image
                                        src={"/Icons/two_arrows.svg"}
                                        alt='icon'
                                        width={30}
                                        height={30}
                                    />
                                </span>{" "}
                                <span className={classes.Span_AR}>الوصف</span>
                            </h1>
                            <div className={classes.Description}>
                                <p className={classes.Description_content}>
                                    بيتزا بالفراخ من ماك تحتوي على الزيتون
                                    والجبن بنوعيه شيدر وموتزاريلا
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Product;
