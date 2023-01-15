import React from "react";
import Image from "next/image";
import Router from "next/router";
// Qr
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import BarcodeSoundWAV from "../../public/sound/Barcode.mp3";
// Redux
import { connect } from "react-redux";
import {
    updateTheCode,
} from "../../Redux/Reducers/layoutReducer";
// Notification
import {toast} from 'react-toastify';

class App extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    barcodeHandler(code) {
        // check if code length is longer than 0
        if(code.length <= 0){
            toast.error('Please type a valid code 😢')
            return;
        }
        // Go to the product page
        Router.push(`/product?itemBarcode=${code}`);
    }

    render() {
        return (
            <div className='Scanner'>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}
                />

                <div className='ResultCode'>
                    <div className='InputContainer'>
                        <label htmlFor='CodeInput_label'>
                            <Image
                                src={"/Icons/code.svg"}
                                width={20}
                                height={20}
                                alt={"Code Icon"}
                            />
                            <p>Code</p>
                        </label>
                        <div className='Input__Button'>
                            <input
                                id='CodeInput'
                                type='text'
                                placeholder='Scan for a code or type one'
                                value={this.props.code}
                                onInput={(e) =>
                                    this.props.updateTheCode(e.target.value)
                                }
                            />
                            <button onClick={() => this.barcodeHandler(this.props.code)}>
                                <Image
                                    src={"/Icons/SubmitLogin_Icon.svg"}
                                    width={18}
                                    height={18}
                                    alt={"Submit Icon"}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onNewScanResult(decodedText, decodedResult) {
        // Run the Sound
        const codeSoundMP3 = new Audio(BarcodeSoundWAV);
        codeSoundMP3.addEventListener("loadeddata", () => {
            codeSoundMP3.play();
        });
        // Update the State in redux
        this.props.updateTheCode(decodedText);
        // What will Happen after Reading the Barecode
        console.log('TEXT')
        console.log(decodedText)
        this.barcodeHandler(decodedText);
    }
}

// export default App;

const mapStateToProps = (state) => ({
    code: state.layout.code,
});

const mapDispatchToProps = (dispatch) => ({
    updateTheCode: (code) => dispatch(updateTheCode({ code })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
