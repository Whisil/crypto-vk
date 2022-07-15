import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import Login from '@/pages/login';
import { useEffect, useRef } from 'react';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';

const AuthCheck = ({ children }: any) => {
  const router = useRouter();
  const mountedRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, isAuthenticating, user } = useMoralis();

  useEffect(() => {
    if (mountedRef.current) {
      if (isAuthenticated) return;
      else if (!isAuthenticated) {
        router.push({ pathname: `/` });
      }
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || user?.attributes.displayName === undefined) {
    return (
      <>
        <div
          className={styles.loaderWrapper}
          style={isAuthenticating ? { opacity: `1`, pointerEvents: `all` } : {}}
        >
          <Loader />
        </div>
        <Login />
      </>
    );
  } else {
    return children;
  }

};

export default AuthCheck;
