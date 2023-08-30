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


const contract = await sdk.getContract("0x0482531CA0D47BCc5dD52e710057B70ce5B942e1");

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
