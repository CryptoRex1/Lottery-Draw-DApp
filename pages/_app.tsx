import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK("polygon", {
  clientId: "YOUR_CLIENT_ID",


const contract = await sdk.getContract("0xCb7aB8F3Cf115c08F3741f9Eff409f8E3529dc7C");

    // Add any global initialization or setup here
  }, []);

  return (
    <ThirdwebProvider desiredChainId={ChainId.polygon}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
