import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/unknown/loader';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { handleUserLogin } from '../authAPI';
import { setUser, setUserWallet } from '@/features/userSlice';

import styles from './styles.module.scss';
import { useAccount } from 'wagmi';
import useIsMounted from '@/hooks/useIsMounted';
import WalletForm from '../walletForm';
import MoreInfoForm from '../moreInfoForm';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  const router = useRouter();

  const mountedRef = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { address, isConnecting } = useAccount();

  const { mounted } = useIsMounted();

  useEffect(() => {
    if (mountedRef.current) {
      if (user.ethAddress) return;
      else if (!user.ethAddress) {
        router.push({ pathname: `/` });
      }
    }
  }, [user.ethAddress, router]);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (address) {
        await handleUserLogin(address)
          .then((result) => {
            if (!result) {
              dispatch(setUserWallet(address));
            } else {
              dispatch(setUser(result));
            }
          })
          .then(() => setIsInitialLoading(false));
      } else {
        setIsInitialLoading(false);
      }
    };

    fetchAndSetUser();
  }, [address, dispatch]);

  if (isInitialLoading || !mounted) {
    return <Loader />;
  }

  if (!user.ethAddress || !user.displayName) {
    return (
      <>
        <div
          className={styles.loaderWrapper}
          style={isConnecting ? { opacity: `1`, pointerEvents: `all` } : {}}
        >
          <Loader />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.illustration} />
          <div className={styles.login}>
            {!user.ethAddress ? (
              <WalletForm />
            ) : user.ethAddress && !user.displayName ? (
              <MoreInfoForm />
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
