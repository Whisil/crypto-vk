import { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import Head from 'next/head';
import '@/styles/global.scss';
import AuthCheck from '@/components/unknown/authCheck';

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
          url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@300;400;500;600&display=swap');
        </style>
      </Head>
      <MoralisProvider
        appId="O9mnxbcx7wLNjr1ESxFjL8pEDP3a7R1fY3rcef0u"
        serverUrl="https://1gwvs9r8ysys.usemoralis.com:2053/server"
      >
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
      </MoralisProvider>
      
    </>
  );
}
