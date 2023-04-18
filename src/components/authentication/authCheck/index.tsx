import { useRouter } from 'next/router';
import Login from '@/pages/login';
import React, { useEffect, useRef } from 'react';
import Loader from '@/components/unknown/loader';
import { useAppSelector } from '@/app/hooks';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const router = useRouter();
  const mountedRef = useRef<HTMLDivElement>(null);

  const { loading, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (mountedRef.current) {
      if (user.ethAddress) return;
      else if (!user.ethAddress) {
        router.push({ pathname: `/` });
      }
    }
  }, [user.ethAddress, router]);

  if (!user.ethAddress || user.displayName === ``) {
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
