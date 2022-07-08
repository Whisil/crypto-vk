import { useMoralis } from 'react-moralis';
import WalletForm from '@/components/authentication/walletForm';
import styles from '../styles/login.module.scss';
import MoreInfoForm from '@/components/authentication/moreInfoForm';

const Login = () => {
  const { isAuthenticated, user } = useMoralis();

  return (
    <div className={styles.wrapper}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        {!isAuthenticated ? (
          <WalletForm />
        ) : isAuthenticated && user?.attributes.displayName === undefined ? (
          <MoreInfoForm userId={user?.id || ''} />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
