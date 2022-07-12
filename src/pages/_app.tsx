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
        appId="Dl1SKRqzUwzKy9uv2wjWwRAHnIxlZvPRPjz1SWt4"
        serverUrl="https://zbldg0cxayez.usemoralis.com:2053/server"
      >
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
      </MoralisProvider>
    </>
  );
}
