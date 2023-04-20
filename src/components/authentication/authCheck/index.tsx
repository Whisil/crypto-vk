import { useRouter } from 'next/router';
import Login from '@/pages/login';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/unknown/loader';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { handleUserLogin } from '../authAPI';
import {
  changeUserLoading,
  clearUser,
  setUser,
  setUserWallet,
} from '@/features/userSlice';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const router = useRouter();
  const mountedRef = useRef<HTMLDivElement>(null);

  const { loading, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mountedRef.current) {
      if (user.ethAddress) return;
      else if (!user.ethAddress) {
        router.push({ pathname: `/` });
      }
    }

    //fake loader to avoid flickering
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
  }, [user.ethAddress, router]);

  // auto metamask connect
  useEffect(() => {
    if (typeof window.ethereum !== `undefined`) {
      if (window.ethereum.isConnected()) {
        const account = window.ethereum.selectedAddress;
        handleUserLogin(account).then((result) => {
          if (!result) {
            dispatch(setUserWallet(account));
          } else {
            dispatch(setUser(result));
          }
        });
      } else {
        console.log(`Metamask is not connected to Ethereum network.`);
      }
      dispatch(changeUserLoading());
    } else {
      window.open(`https://metamask.io/`);
    }
  }, [dispatch]);

  //metamask logout listener
  useEffect(() => {
    if (window.ethereum.isConnected()) {
      const handleMetamaskDisconnect = () => {
        dispatch(clearUser());
        console.log(`disconnected`);
      };

      window.ethereum.on(`accountsChanged`, handleMetamaskDisconnect);

      return () => {
        window.ethereum.removeEventListener(
          `accountsChanged`,
          handleMetamaskDisconnect,
        );
      };
    }
  }, [dispatch]);

  if (isInitialLoading) {
    return <Loader />;
  } else if (!user.ethAddress || !user.displayName) {
    return (
      <>
        <div
          className={styles.loaderWrapper}
          style={loading ? { opacity: `1`, pointerEvents: `all` } : {}}
        >
          <Loader />
        </div>
        <Login />
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthCheck;
