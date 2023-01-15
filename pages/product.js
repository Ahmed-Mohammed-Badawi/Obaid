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

    // Authentication Check
    useEffect(() => {
        // redirect if the authenticated is false
        const authenticated = document.cookie.split("=");
        if (!authenticated || authenticated[1] !== "true") {
            // redirect if Authentication is not true
            router.replace("/login");
        }
    }, [router]);

    // State
    const [data, setData] = useState();

    // Refs
    const quantityRef = useRef();

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
                    router.push("/scan");
                } else {
                    // if any another error redirect to scan page
                    router.push("/scan");
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
    // LogoutHandler
    const logoutHandler = () => {
        // clear the scan input
        dispatch(clearTheInput());
        // change the authenticated state at cookies
        document.cookie = `authenticated=false;`;
        // remove username from localStorage
        localStorage.removeItem("username");
        // redirect to login
        router.replace("/login");
    };

    // Update The Data
    const UpdateHandler = (e, Asset_Number) => {
        // Prevent Default the Action
        e.preventDefault();
        // get the value from inputs and store in constants
        const quantityValue = quantityRef.current.value;
        // get the username from the localstorage
        const username = localStorage.getItem("username");
        // Signout if no username and erdirect to login
        if (!username) {
            logoutHandler();
            toast.error("Username is not Saved 😢 please login again");
            return;
        }
        // check ig no code return to scan page
        if (!Asset_Number) {
            router.push("/scan");
            toast.error("The item code is invalid or un exist");
            return;
        }
        // check if the quantity is invalid
        if (
            isNaN(quantityValue) ||
            quantityValue === "" ||
            quantityValue === null
        ) {
            toast.error("The Entered Quantity is invalid");
            return;
        }
        // Send the update request to the server
        axios
            .post(`${process.env.NEXT_PUBLIC_CREATE_RECORD_ENDPOINT}`, {
                itemBarcode: Asset_Number,
                quantity: quantityValue,
                username: username,
            })
            .then((res) => {
                // Show a notification
                if (res.data.success && res.data.message) {
                    toast.success(`${res.data.message} ✨`);
                }

                // clear quentity
                quantityValue = ''
                // Return res data
                return res.data;
            })
            .catch((err) => {
                if (err.response?.data?.message) {
                    // show an error message
                    toast.error(`${err.response.data.message} 😢`);
                } else {
                    // show an error message
                    toast.error(`${err.message} 😢`);
                }
            });
    };

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
                        <div className={classes.Top}>
                            <div className={classes.LogoContainer}>
                                <div className={classes.Logo}>
                                    Goo<span>Admin</span>
                                </div>
                            </div>
                            <button
                                className={classes.LogOut}
                                onClick={logoutHandler}
                            >
                                <Image
                                    src={"/Icons/Logout.svg"}
                                    width={18}
                                    height={18}
                                    alt={"Logout Icon"}
                                />
                                Logout
                            </button>
                        </div>
                        <div className={classes.Bottom}>
                            <button
                                className={classes.Create}
                                onClick={() => router.push("/")}
                            >
                                <Image
                                    src={"/Icons/Home.svg"}
                                    width={30}
                                    height={30}
                                    alt={"Create Icon"}
                                />
                            </button>
                            <button
                                className={classes.Scan}
                                onClick={() => {
                                    dispatch(clearTheInput());
                                    router.push("/scan");
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
                        <article className={classes.Admin_Item}>
                            <h2>Asset Name</h2>
                            <p>{data && data[0]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Price</h2>
                            <p>{data && data[1]}</p>
                        </article>
                    </section>
                    <section className={classes.Section_3}>
                        <form
                            style={{ width: "100%" }}
                            onSubmit={(e) => {
                                // Code from url query
                                const { itemBarcode: queryCode } = router.query;
                                UpdateHandler(e, ReduxCode || queryCode);
                                // clear the input
                                dispatch(clearTheInput());
                                // redirect to scan
                                router.push("/scan");
                            }}
                        >
                            <article className={classes.User_Item}>
                                <label htmlFor='quantity'>Quantity</label>
                                <input
                                    id='quantity'
                                    type={"number"}
                                    placeholder={"Enter Quantity"}
                                    ref={quantityRef}
                                    required={"on"}
                                    min={'0'}
                                />
                            </article>
                            <div className={classes.BTN_Container}>
                                <ScanButton
                                    submit_function={() => {
                                        dispatch(clearTheInput());
                                        router.push("/scan");
                                    }}
                                />
                                <SubmitButton
                                    buttonText={"Update"}
                                    buttonFunction={() => {}}
                                />
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Product;
