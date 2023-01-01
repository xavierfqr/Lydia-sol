import { Button } from '@web3uikit/core';
import { Blockie } from '@web3uikit/web3';
import React from 'react';
import { TransactionContext } from '../context/context';
import { shortenAddress } from '../utils/contract';

function Navbar() {
  const { account, connectWallet } = React.useContext<{ account: string; connectWallet: any }>(TransactionContext);
  console.log(account);
  return (
    <nav className="bg-black text-white border-b-2 border-blue-100 px-2 py-2.5 flex justify-between flex-col sm:flex-row">
      <div className="text-2xl italic ml-2">LYDIA.SOL</div>
      <div className="mr-4">
        {account ? (
          <div className="flex justify-center">
            <div className="m-1 mr-3">
              Welcome <span className="font-bold">{shortenAddress(account)}</span> 👋{' '}
            </div>
            <Blockie seed={account} className="w-full" />
          </div>
        ) : (
          <Button text="Connect Wallet" onClick={connectWallet} />
          // <button
          //   className="hover:bg-gray-700 text-white bg-gray-800 p-2 rounded ml-4"
          //   type="submit"
          //   disabled={!account}
          // >
          //   Send
          // </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
