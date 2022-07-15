import { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import Head from 'next/head';
import '@/styles/global.scss';
import AuthCheck from '@/components/authentication/authCheck';

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <MoralisProvider
        appId="3LhvQSOy3gt2PTZ0ua8AQuEDwtisUhTvOGS6sMUg"
        serverUrl="https://ew7afpe1clbr.usemoralis.com:2053/server"
      >
        {/* <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck> */}
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}
