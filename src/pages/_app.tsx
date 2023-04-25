import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/global.scss';
import AuthCheck from '@/components/authentication/authCheck';
import MainLayout from '@/containers/MainLayout';
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const { provider } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: `https://rpc.brovider.xyz/${chain.id}` }),
    }),
  ],
);

const client = createClient({
  autoConnect: true,
  provider,
});

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout & AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>?</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        ></meta>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap&apos;);
        </style>
      </Head>

      <Provider store={store}>
        <WagmiConfig client={client}>
          <AuthCheck>
            <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
          </AuthCheck>
        </WagmiConfig>
      </Provider>
    </>
  );
}
