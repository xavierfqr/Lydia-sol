import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NotificationProvider } from '@web3uikit/core';
import { TransactionProvider } from '../context/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </NotificationProvider>
  );
}
