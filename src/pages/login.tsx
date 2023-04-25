import WalletForm from '@/components/authentication/walletForm';
import styles from '../styles/login.module.scss';
import MoreInfoForm from '@/components/authentication/moreInfoForm';
import { useAppSelector } from '@/app/hooks';

const Login = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        {!user.ethAddress ? (
          <WalletForm />
        ) : user.ethAddress && !user.displayName ? (
          <MoreInfoForm />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
