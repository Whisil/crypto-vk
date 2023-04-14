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

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout & AppProps) {
  const AppId = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_APP_ID;
  const ServerUrl = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_SERVER_URL;

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
      {/* <MoralisProvider appId={AppId as string} serverUrl={ServerUrl as string}>
        <AuthCheck>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </AuthCheck>
        
      </MoralisProvider> */}
      <Provider store={store}>
        <AuthCheck>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </AuthCheck>
      </Provider>
    </>
  );
}
