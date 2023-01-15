import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initalProps = await Document.getInitialProps(ctx);
        return initalProps;
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name='theme-color' content='#4285f4' />
                    <link rel='icon' href='/Icons/favicon.png' />
                    <link rel="apple-touch-icon" href="/Icons/favicon.png"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
