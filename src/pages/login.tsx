import MetamaskIcon from 'public/images/icons/metamask.svg';
import Logo from 'public/images/icons/logo.svg';

import styles from '../styles/login.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.illustration} />
      <div className={styles.login}>
        <Logo className={styles.logo}/>
        <h1 className={styles.heading}>Connect wallet</h1>
        <p className={styles.subHeading}>
          Choose the{' '}
          <a
            href="https://www.coinbase.com/ru/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet"
            target="_blank"
          >
            wallet
          </a>{' '}
          you want to connect with
        </p>
        <div className={styles.wallet}>
          <MetamaskIcon />
          <span>MetaMask</span>
        </div>

        <p className={styles.infoText}>Soon we'll be able to support more :{`)`}</p>
      </div>
    </div>
  );
};

export default Login;
