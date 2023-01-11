import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NotificationProvider } from '@web3uikit/core';
import { ChakraProvider } from '@chakra-ui/react';

import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }), publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <ChakraProvider>
        <WagmiConfig client={client}>
          {/* <TransactionProvider> */}
          <Component {...pageProps} />
          {/* </TransactionProvider> */}
        </WagmiConfig>
      </ChakraProvider>
    </NotificationProvider>
  );
}
