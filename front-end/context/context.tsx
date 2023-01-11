import React, { useCallback, useEffect } from 'react';
import { useErrorNotification } from '../hooks/notifications';

export const TransactionContext = React.createContext<{ account: string; connectWallet: any }>({
  account: '',
  connectWallet: () => {},
});

export const TransactionProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [account, setAccount] = React.useState('');
  const handleErrorNotification = useErrorNotification();

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        handleErrorNotification('Make sure you have metamask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        setAccount(accounts[0]);
      } else {
        handleErrorNotification('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleErrorNotification]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        handleErrorNotification('Make sure you have metamask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return <TransactionContext.Provider value={{ account, connectWallet }}>{children}</TransactionContext.Provider>;
};
