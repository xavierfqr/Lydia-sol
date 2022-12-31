import React, { useContext, useEffect } from 'react';
import { getLydiaContract, shortenAddress } from '../utils/contract';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { Blockie } from '@web3uikit/web3';

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
      const tsxArray = await lydiaContract.getTransactions();
      setTransactions([...tsxArray].reverse());

      lydiaContract.on('Transfer', async () => {
        const tsxArray = await lydiaContract.getTransactions();
        setTransactions([...tsxArray].reverse());
      });
    }
    getTransactions();
  }, []);

  return (
    <div className="flex-grow m-8 overflow-scroll scrollbar-hide h-[40rem]">
      {transactions.map((transaction, index) => {
        return (
          <div key={index} className="p-4 min-w-[400px] border-b-2 border-gray-500">
            <div className="flex">
              <div className="mr-4">
                <Blockie seed={transaction.sender} />
              </div>
              <div>
                <div className="italic font-medium text-gray-500">
                  <span>{shortenAddress(transaction.sender)}</span>
                  <span className="mx-2">to</span>
                  <span>{shortenAddress(transaction.receiver)}</span>
                  <span className="text-xs font-light text-gray-400">
                    <span className="mx-4">●</span>
                    {parseInt(transaction.value._hex) / 10 ** 18} ETH
                  </span>
                </div>
                <div className="text-xs font-light text-gray-400 mb-4 flex">
                  <span className="mr-[3px]">{moment(new Date(Number(transaction.timestamp) * 1000)).fromNow()}</span>
                  <GlobeAltIcon width="10px" />
                </div>
                <div className="text-white">{transaction.message}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Transactions;
