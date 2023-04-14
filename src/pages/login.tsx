import { useRef } from 'react';
import WalletForm from '@/components/authentication/walletForm';
import styles from '../styles/login.module.scss';
import MoreInfoForm from '@/components/authentication/moreInfoForm';
import { useAppSelector } from '@/app/hooks';

const Login = () => {
  const mountedRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, displayName } = useAppSelector(
    (state) => state.auth,
  );

  return (
    <div className={styles.wrapper} ref={mountedRef}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        {!isAuthenticated && mountedRef.current ? (
          <WalletForm />
        ) : isAuthenticated && displayName === `` && mountedRef.current ? (
          <MoreInfoForm />
        ) : null}
        <WalletForm />
      </div>
    </div>
  );
};

export default Login;
