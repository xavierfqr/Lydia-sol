import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NotificationProvider } from '@web3uikit/core';
import { TransactionProvider } from '../context/context';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <ChakraProvider>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </ChakraProvider>
    </NotificationProvider>
  );
}
