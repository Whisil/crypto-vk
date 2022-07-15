import { useRef } from 'react';
import { useMoralis } from 'react-moralis';
import WalletForm from '@/components/authentication/walletForm';
import styles from '../styles/login.module.scss';
import MoreInfoForm from '@/components/authentication/moreInfoForm';

const Login = () => {
  const { isAuthenticated, user } = useMoralis();
  const mountedRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper} ref={mountedRef}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        {!isAuthenticated && mountedRef.current ? (
          <WalletForm />
        ) : isAuthenticated &&
          user?.attributes.displayName === undefined &&
          mountedRef.current ? (
          <MoreInfoForm 
          // userId={user?.id || ``} 
          />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
