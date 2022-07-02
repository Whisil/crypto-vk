import Image from 'next/image';
import { useMoralis } from "react-moralis";
import Logo from 'public/images/icons/logo.svg';

import styles from '../styles/login.module.scss';

const Login = () => {
  const { authenticate } = useMoralis();

  const loginWalletConnect = async () => {
    await authenticate({
      provider: 'walletconnect',
      chainId: 80001,
      signingMessage: 'Welcome to a true web',
    });
  };
  const loginMetamask = async () => {
    await authenticate({ signingMessage: 'Welcome to a true web' });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        <Logo className={styles.logo} />
        <h1 className={styles.heading}>Connect wallet</h1>
        <p className={styles.subHeading}>
          Choose the{' '}
          <a
            href="https://www.coinbase.com/ru/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet"
            target="_blank"
          >
            wallet
          </a>{' '}
          you want to connect with
        </p>
        <div className={styles.wallet} onClick={loginMetamask}>
          <Image
            src="/images/icons/metamask.svg"
            width="34px"
            height="34px"
            alt="Metamask"
          />
          <span>MetaMask</span>
        </div>

        <div className={styles.wallet} onClick={loginWalletConnect}>
          <Image
            src="/images/icons/wallet-connect.svg"
            width="34px"
            height="34px"
            alt="Wallet Connect"
          />
          <span>Wallet Connect</span>
        </div>

        <p className={styles.infoText}>
          Soon we'll be able to support more :{`)`}
        </p>
      </div>
    </div>
  );
};

export default Login;
