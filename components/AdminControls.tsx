import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import toast from 'react-hot-toast';

function AdminControls({ contract }) {

    const { data: totalCommission } = useContractRead(contract, "operatorTotalCommission");

    const { mutateAsync: drawWinner } = useContractWrite(contract, "DrawWinnerTicket");
    
    const { mutateAsync: refundAll } = useContractWrite(contract, "RefundAll");
    
    const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw");
    
    const { mutateAsync: withdrawCommission } = useContractWrite(contract, "WithdrawCommission");

    const handleContractCall = async (mutateFunction, message) => {
        const notification = toast.loading(message);

        try {
            const data = await mutateFunction([{}]);

            toast.success("Action successful!", {
                id: notification,
            });

            console.info("Contract call success", data);
        }
        catch (err) {
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });

            console.error("Contract call failed", err);
        }
    }

    return (
        <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
            <h2 className='font-bold'>Admin Controls</h2>
            <p className='mb-5'>Total Commission to be withdrawn:{" "}
                {totalCommission && ethers.utils.formatEther(totalCommission?.toString())}
                {" "}{currency}</p>
            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
                <button
                    onClick={() => handleContractCall(drawWinner, "Picking a Lucky Winner...")}
                    className='admin-button'>
                    <StarIcon className='h-6 mx-auto mb-2' />
                    Draw Winner
                </button>
                <button
                    onClick={() => handleContractCall(withdrawCommission, "Withdrawing the commission...")}
                    className='admin-button'>
                    <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                    Withdraw Commission
                </button>
                <button
                    onClick={() => handleContractCall(restartDraw, "Restarting the draw...")}
                    className='admin-button'>
                    <ArrowPathIcon className='h-6 mx-auto mb-2' />
                    Restart Draw
                </button>
                <button
                    onClick={() => handleContractCall(refundAll, "Refunding all...")}
                    className='admin-button'>
                    <ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
                    Refund All
                </button>
            </div>
        </div>
    )
}

export default AdminControls;
