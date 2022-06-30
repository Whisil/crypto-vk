import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/global.scss';
import Login from './login';

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
      {/* <Component {...pageProps} /> */}
      <Login />
    </>
  );
}
