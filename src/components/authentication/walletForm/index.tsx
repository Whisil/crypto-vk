import RippleBtn from '@/components/unknown/rippleBtn';
import Image from 'next/image';
import { InjectedConnector } from 'wagmi/connectors/injected';

import styles from './styles.module.scss';
import { useConnect } from 'wagmi';

const WalletForm = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

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
        <div className={styles.wallet} onClick={() => connect()}>
          <Image
            src="/images/icons/metamask.svg"
            width="34px"
            height="34px"
            alt="Metamask"
          />
          <span>MetaMask</span>
        </div>
      </RippleBtn>

      <p className={styles.infoText}>
        Soon we&apos;ll be able to support more :{`)`}
      </p>
    </>
  );
};

export default WalletForm;
