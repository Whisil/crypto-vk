import RippleBtn from '@/components/unknown/rippleBtn';
import Image from 'next/image';
import styles from './styles.module.scss';

const WalletForm = () => {
  // const { Moralis, authenticate, enableWeb3 } = useMoralis();

  // const loginWalletConnect = async () => {
  //   await authenticate({
  //     provider: `walletconnect`,
  //     chainId: 80001,
  //     signingMessage: `Welcome to a true web`,
  //   });
  // };
  // const loginMetamask = async () => {
  //   await authenticate({ signingMessage: `Welcome to a true web` });
  // };
  // const handleAuth = async (provider: 'metamask' | 'walletconnect') => {
  //   try {
  //     await enableWeb3({ throwOnError: true, provider });
  //     const { account, chainId } = Moralis;

  //     if (!account) {
  //       throw new Error(
  //         `Connecting to chain failed, as no connected account was found`,
  //       );
  //     }
  //     if (!chainId) {
  //       throw new Error(
  //         `Connecting to chain failed, as no connected chain was found`,
  //       );
  //     }

  //     const { message } = await Moralis.Cloud.run(`requestMessage`, {
  //       address: account,
  //       chain: 80001,
  //     });

  //     // auth and login via parse
  //     await authenticate({
  //       signingMessage: message,
  //       throwOnError: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        {/* <div className={styles.wallet} onClick={() => handleAuth(`metamask`)}>
          <Image
            src="/images/icons/metamask.svg"
            width="34px"
            height="34px"
            alt="Metamask"
          />
          <span>MetaMask</span>
        </div> */}
      </RippleBtn>

      <RippleBtn className={styles.spacing}>
        <div
          className={styles.wallet}
          // onClick={() => handleAuth(`walletconnect`)}
        >
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
