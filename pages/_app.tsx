import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add any global initialization or setup here
  }, []);

  return (
    <ThirdwebProvider desiredChainId={ChainId.PolygonMainnet}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
