import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import {
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import Login from '../components/Login';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import CountDownTimer from '../components/CountDownTimer';
import toast from 'react-hot-toast';
import Marquee from 'react-fast-marquee';
import AdminControls from '../components/AdminControls';

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const [userTickets, setUserTickets] = useState(0);

  const { data: expiration } = useContractRead(contract, 'expiration');
  const { data: remainingTickets } = useContractRead(
    contract,
    'RemainingTickets'
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    'CurrentWinningReward'
  );
  const { data: ticketPrice } = useContractRead(contract, 'ticketPrice');
  const { data: ticketCommission } = useContractRead(contract, 'ticketCommission');
  const { mutateAsync: BuyTickets } = useContractWrite(contract, 'BuyTickets');
  const { data: tickets } = useContractRead(contract, 'getTickets');
  const { data: winnings } = useContractRead(
    contract,
    'getWinningsForAddress',
    address
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    'WithdrawWinnings'
  );
  const { data: lastWinner } = useContractRead(contract, 'lastWinner');
  const { data: lastWinnerAmount } = useContractRead(contract, 'lastWinnerAmount');
  const { data: isLotteryOperator } = useContractRead(contract, 'lotteryOperator');

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) =>
        ticketAddress === address ? total + 1 : total,
      0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets, address]);

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading('Buying your tickets...');

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
          ),
        },
      ]);

      toast.success('Tickets Purchased Successfully!', {
        id: notification,
      });
      console.info('Contract call success', data);
    } catch (err) {
      toast.error('Whoops, something went wrong!', {
        id: notification,
      });

      console.error('Contract call failure', err);
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading('Withdrawing your winnings...');

    try {
      const data = await WithdrawWinnings([{}]);

      toast.success('Winnings Withdrawn Successfully!', {
        id: notification,
      });
    } catch (err) {
      toast.error('Whoops, something went wrong!', {
        id: notification,
      });

      console.error('Contract call failure', err);
    }
  };

  if (isLoading) return <Loading />;

  if (!address) return <Login />;

  return (
    <div className='bg-[#091818] min-h-screen flex flex-col'>
      <Head>
        <title>CRYPTO LOTTERY DRAW</title>
      </Head>

      <div className='flex-1'>
        <Header />

        <Marquee className='bg-[#0A1F1C] p-5 mb-5' gradient={false} speed={100}>
          <div className='flex space-x-2 mx-10'>
            <h4 className='text-white font-bold'>Last Winner: {lastWinner?.toString()}</h4>
            <h4 className='text-white font-bold'>
              Previous Winnings: {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())} {currency}
            </h4>
          </div>
        </Marquee>

        {isLotteryOperator === address && (
          <div className='flex justify-center'>
            <AdminControls />
          </div>
        )}

        {winnings > 0 && (
          <div
            onClick={onWithdrawWinnings}
            className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'
          >
            <button className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full'>
              <p className='font-bold'>Winner Winner Chicken Dinner!</p>
              <p>
                Total Winnings: {ethers.utils.formatEther(winnings.toString())} {currency}
              </p>
              <br />
              <p className='font-semibold'>Click here to withdraw</p>
            </button>
          </div>
        )}

        {/* the next draw box */}
        <div className='space-y-5 ms:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          {/* ... */}
        </div>

        <div className='space-y-2 mt-5'>
          {/* ... */}
        </div>
      </div>

      <footer className='border-t border-emerald-500/20 flex items-center text-white justify-between p-5'>
        {/* ... */}
      </footer>
    </div>
  );
};

export default Home;
