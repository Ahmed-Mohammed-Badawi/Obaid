import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
// Redux
import { Provider } from "react-redux";
import { wrapper } from "../Redux/store";
// Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
                <ToastContainer position='bottom-left' />
            </Layout>
        </Provider>
    );
}

export default MyApp;
