import { useRouter } from 'next/router';
import Login from '@/pages/login';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/unknown/loader';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { handleUserLogin } from '../authAPI';
import { setUser, setUserWallet } from '@/features/userSlice';

import styles from './styles.module.scss';
import { useAccount } from 'wagmi';
import useIsMounted from '@/hooks/useIsMounted';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const router = useRouter();
  const mountedRef = useRef<HTMLDivElement>(null);

  const { loading, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { address } = useAccount();
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

  if (!isInitialLoading && (!user.ethAddress || !user.displayName)) {
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
  }

  return <>{children}</>;
};

export default AuthCheck;
