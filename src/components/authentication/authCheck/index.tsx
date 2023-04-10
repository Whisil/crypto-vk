import { useRouter } from 'next/router';
import Login from '@/pages/login';
import React, { useEffect, useRef } from 'react';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const router = useRouter();
  const mountedRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (mountedRef.current) {
  //     if (isAuthenticated) return;
  //     else if (!isAuthenticated) {
  //       router.push({ pathname: `/` });
  //     }
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated || user?.attributes.displayName === undefined) {
  //   return (
  //     <>
  //       <div
  //         className={styles.loaderWrapper}
  //         style={isAuthenticating ? { opacity: `1`, pointerEvents: `all` } : {}}
  //       >
  //         <Loader />
  //       </div>
  //       <Login />
  //     </>
  //   );
  // } else {
  //   return <>{children}</>;
  // }
  return <>{children}</>;
};

export default AuthCheck;
