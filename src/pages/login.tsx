import { useEffect, useRef } from 'react';
import WalletForm from '@/components/authentication/walletForm';
import styles from '../styles/login.module.scss';
import MoreInfoForm from '@/components/authentication/moreInfoForm';
import { useAppSelector } from '@/app/hooks';

const Login = () => {
  // const mountedRef = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(user.ethAddress);
  }, [user]);
  return (
    <div
      className={styles.wrapper}
      // ref={mountedRef}
    >
      <div className={styles.illustration} />
      <div className={styles.login}>
        {user.ethAddress.length === 0 ? (
          <WalletForm />
        ) : user.ethAddress && user.displayName === `` ? (
          <MoreInfoForm />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
