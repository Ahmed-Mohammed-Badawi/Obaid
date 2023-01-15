import classes from "../components/Pages/Home.module.scss";
// Imports
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// Redux
import { useDispatch } from "react-redux";
import { clearTheInput } from "../Redux/Reducers/layoutReducer";

export default function Home() {
    // initialize Router
    const router = useRouter();

    // initialize Redux
    const dispatch = useDispatch();

    // LogoutHandler
    const logoutHandler = () => {
        // clear the scan input
        dispatch(clearTheInput());
        // change the authenticated to false
        document.cookie = `authenticated=false;`;
        // remove username from localStorage
        localStorage.removeItem('username')
        // redirect
        router.replace("/login");
    };
    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name='description'
                    content='Inventory Home Page where you can create or scan a product'
                />
            </Head>
            <div className={classes.Home}>
                <div className={classes.Content}>
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
                            className={classes.MainBTN}
                            onClick={() => router.push("/scan")}
                        >
                            <Image
                                src={"/Icons/ScannerBTN.svg"}
                                width={40}
                                height={40}
                                alt={"Scanner Icon"}
                            />
                            <span className={classes.BTNContent}>Scan</span>
                        </button>
                        <button className={classes.SecondaryBTN}>
                            <Image
                                src={"/Icons/Create.svg"}
                                width={40}
                                height={40}
                                alt={"Scanner Icon"}
                            />
                            <span className={classes.BTNContent}>Create</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Cookies
    const { authenticated } = ctx.req.cookies;
    // check if the user is valid
    if (!authenticated || authenticated !== "true") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
