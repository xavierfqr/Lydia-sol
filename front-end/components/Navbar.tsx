import { Blockie } from '@web3uikit/web3';
import React from 'react';
import { TransactionContext } from '../context/context';

function Navbar() {
  const { account, connectWallet } = React.useContext<{ account: string; connectWallet: any }>(TransactionContext);
  console.log(account);
  return (
    <nav className="bg-white border-b-4 border-blue-100 px-2 py-2.5 rounded flex justify-between">
      <div className="text-2xl">LOGO</div>
      {account ? (
        <div className="flex justify-center">
          <div className="m-1 mr-3">
            Welcome{' '}
            <span className="font-bold">
              {account.substring(0, 3)}...{account.substring(account.length - 4, account.length)}
            </span>{' '}
            👋{' '}
          </div>
          <Blockie seed={account} />
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </nav>
  );
}

export default Navbar;
