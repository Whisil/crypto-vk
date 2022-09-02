import { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import Head from 'next/head';
import '@/styles/global.scss';
import AuthCheck from '@/components/authentication/authCheck';

export default function MyApp({ Component, pageProps }: AppProps) {
  const AppId = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_APP_ID;
  const ServerUrl = process.env.NEXT_PUBLIC_REACT_APP_MORALIS_SERVER_URL;

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
      <MoralisProvider appId={AppId as string} serverUrl={ServerUrl as string}>
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
        {/* <Component {...pageProps} /> */}
      </MoralisProvider>
    </>
  );
}
