import React, { useEffect } from 'react';
import { getLydiaContract, shortenAddress } from '../utils/contract';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import moment from 'moment';

type Transaction = {
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
  value: {
    _hex: string;
  };
};

function Transactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  useEffect(() => {
    async function getTransactions() {
      const lydiaContract = getLydiaContract();
      setTransactions(await lydiaContract.getTransactions());

      lydiaContract.on('Transfer', async (from, to, value, message, timestamp) => {
        console.log(from, to, value, message, timestamp);
        setTransactions(await lydiaContract.getTransactions());
      });
    }
    getTransactions();
  }, []);

  return (
    <div className="flex-grow m-8 overflow-scroll scrollbar-hide h-[40rem]">
      {transactions.map((transaction, index) => {
        return (
          <div key={index} className="p-4 min-w-[400px] border-b-2 border-gray-500">
            <div className="italic font-medium text-gray-500">
              <span>{shortenAddress(transaction.sender)}</span>
              <span className="mx-2">to</span>
              <span>{shortenAddress(transaction.receiver)}</span>
            </div>
            <div className="text-xs font-light text-gray-400 mb-4 flex">
              <span className="mr-[3px]">{moment(new Date(Number(transaction.timestamp) * 1000)).fromNow()}</span>
              <GlobeAltIcon width="10px" />
            </div>

            <div className="text-white">{transaction.message}</div>
            <div className="text-xs font-light text-gray-400">{parseInt(transaction.value._hex) / 10 ** 18} ETH</div>
          </div>
        );
      })}
    </div>
  );
}

export default Transactions;
