import RippleBtn from '@/components/unknown/rippleBtn';
import Image from 'next/image';
import {
  changeUserLoading,
  setUser,
  setUserWallet,
} from '@/features/userSlice';
import { useAppDispatch } from '@/app/hooks';
import { handleUserLogin } from '../authAPI';

import styles from './styles.module.scss';

const WalletForm = () => {
  const dispatch = useAppDispatch();

  const handleMetamask = async () => {
    try {
      dispatch(changeUserLoading());

      const provider = window.ethereum;
      if (provider) {
        await provider
          .request({ method: `eth_requestAccounts` })
          .then((accounts: string[]) => {
            return accounts[0];
          })
          .then((account: string) => {
            handleUserLogin(account).then((result) => {
              if (!result) {
                dispatch(setUserWallet(account));
              } else {
                dispatch(setUser(result));
              }
            });
          });
      } else {
        window.open(`https://metamask.io/`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(changeUserLoading());
    }
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
        <div className={styles.wallet} onClick={handleMetamask}>
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
