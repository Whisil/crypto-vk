import RippleBtn from '@/components/unknown/rippleBtn';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';

import styles from './styles.module.scss';

const WalletForm = () => {
  const { authenticate } = useMoralis();

  const loginWalletConnect = async () => {
    await authenticate({
      provider: `walletconnect`,
      chainId: 80001,
      signingMessage: `Welcome to a true web`,
    });
  };
  const loginMetamask = async () => {
    await authenticate({ signingMessage: `Welcome to a true web` });
  };

  return (
    <>
      <h1 className={styles.heading}>Connect wallet</h1>
      <p className={styles.subHeading}>
        Choose the{` `}
        <a
          href="https://www.coinbase.com/ru/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet"
          target="_blank"
          rel="noreferrer"
        >
          wallet
        </a>
        {` `}
        you want to connect with
      </p>
      <RippleBtn className={styles.spacing}>
        <div className={styles.wallet} onClick={loginMetamask}>
          <Image
            src="/images/icons/metamask.svg"
            width="34px"
            height="34px"
            alt="Metamask"
          />
          <span>MetaMask</span>
        </div>
      </RippleBtn>

      <RippleBtn className={styles.spacing}>
        <div className={styles.wallet} onClick={loginWalletConnect}>
          <Image
            src="/images/icons/wallet-connect.svg"
            width="34px"
            height="34px"
            alt="Wallet Connect"
          />
          <span>Wallet Connect</span>
        </div>
      </RippleBtn>

      <p className={styles.infoText}>
        Soon we&apos;ll be able to support more :{`)`}
      </p>
    </>
  );
};

export default WalletForm;
