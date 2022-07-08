import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import Login from '@/pages/login';
import { useEffect } from 'react';

import styles from './styles.module.scss';

const AuthCheck = ({ children }: any) => {
  const router = useRouter();

  const { isAuthenticated, isAuthenticating, user } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) return;
    else if (!isAuthenticated) {
      router.push({ pathname: '/' });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || user?.attributes.displayName === undefined) {
    return (
      <>
        <div className={styles.loaderWrapper} style={isAuthenticating ? {opacity : '1', pointerEvents: 'all'} : {}}>
            <div className={styles.bounce}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <Login />
      </>
    );
  }
   else {
    return children;
  }
};

export default AuthCheck;
