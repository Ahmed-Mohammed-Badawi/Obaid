import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import classes from "../components/Pages/product.module.scss";
// IMPORTS
import Head from "next/head";
import Image from "next/image";
import SubmitButton from "../components/Layout/SubmitButton";
import axios from "axios";
import ScanButton from "../components/Layout/ScanButton";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { clearTheInput } from "../Redux/Reducers/layoutReducer";
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
                    <section className={classes.Section_1}>
                        <Image
                            src={"/test.jpg"}
                            width={600}
                            height={400}
                            layout='responsive'
                            objectFit='cover'
                            quality={100}
                            alt='Home'
                        />
                        <div className={classes.Bottom}>
                            <button
                                className={classes.Scan}
                                onClick={() => {
                                    router.push("/");
                                }}
                            >
                                <Image
                                    src={"/Icons/Scanner_Black.svg"}
                                    width={30}
                                    height={30}
                                    alt={"Scan Icon"}
                                />
                            </button>
                        </div>
                    </section>
                    <section className={classes.Section_2}>
                        <article
                            className={[classes.Admin_Item, classes.Rtl].join(
                                " "
                            )}
                        >
                            <h2>اسم المنتج</h2>
                            <p>{data && data[0]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Product Name</h2>
                            <p>The Name of the product in English</p>
                        </article>
                        <article
                            className={[classes.Admin_Item, classes.Rtl].join(
                                " "
                            )}
                        >
                            <h2>الوصف</h2>
                            <p>{data && data[0]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Description</h2>
                            <p>
                                This is a description about the product above
                                you can know all what you need 
                            </p>
                        </article>
                        <article
                            className={[classes.Admin_Item, classes.Rtl].join(
                                " "
                            )}
                        >
                            <h2>السعر</h2>
                            <p>{data && data[1]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Price</h2>
                            <p>{data && data[1]}</p>
                        </article>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Product;
