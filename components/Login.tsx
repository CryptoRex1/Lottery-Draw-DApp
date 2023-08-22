import { useMetamask } from '@thirdweb-dev/react';
import React from 'react';

function Login() {

    const connectWithMetamask = useMetamask();

    return (
        <div className='bg-[#091818] min-h-screen flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center mb-10'>
                <img
                    className='rounded-full h-56 w-56 mb-10'
                    src='https://th.bing.com/th/id/OIP.IGw_KICGfAoJXHo4cIk2tgHaHa?pid=ImgDet&rs=1'
                    alt='Logo'
                />

                <h1 className='text-4xl sm:text-5xl lg:text-6xl text-white font-bold'>
                    Welcome to The CRYPTO LUCKY DRAW
                </h1>

                <h2 className='text-white mt-3'>
                    Get started by logging in with your MetaMask wallet
                </h2>

                <button
                    onClick={connectWithMetamask}
                    className='bg-white px-6 py-3 mt-8 rounded-lg shadow-lg font-bold hover:bg-opacity-90 transition-colors'>
                    Login with MetaMask
                </button>
            </div>

            <footer className='text-white text-sm text-center mt-8'>
                DISCLAIMER: The website is published by Anonymous, the operator of the Lottery Draw.
                The developer takes all reasonable measures to ensure the information is accurate,
                but gives no representation or warranty (express or implied) about this site,
                including the accuracy or completeness of its contents. You are responsible for any
                decision made based on information on this site. The developer and its directors,
                employees, or agents accept no liability for loss or damage that arises out of or
                relates to the use of this site or its contents. If there is any conflict between
                the information on this site and the Rules and Procedures for National Lottery games,
                the Rules and Procedures will take priority.
            </footer>
        </div>
    )
}

export default Login;
