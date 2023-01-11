import { Button } from '@web3uikit/core';
import { Blockie } from '@web3uikit/web3';
import React from 'react';
import { useAccount, useConnect } from 'wagmi';
import { shortenAddress } from '../utils/contract';

function Navbar() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  return (
    <nav className="bg-black text-white border-b-2 border-blue-100 px-2 py-2.5 flex justify-between flex-col sm:flex-row">
      <div className="text-2xl italic ml-2">LYDIA.SOL</div>
      <div className="mr-4">
        {address ? (
          <div key="user" className="flex justify-center">
            <div className="m-1 mr-3">
              Welcome <span className="font-bold">{shortenAddress(address)}</span> 👋{' '}
            </div>
            <Blockie seed={address} className="w-full" />
          </div>
        ) : (
          <Button text="Connect Wallet" onClick={() => connect({ connector: connectors[0] })} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
