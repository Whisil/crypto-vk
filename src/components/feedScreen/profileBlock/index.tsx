import AccountImage from '@/components/unknown/accountImage';
import { useMoralis } from 'react-moralis';
import RippleBtn from '@/components/unknown/rippleBtn';
import Link from 'next/link';
import styles from './styles.module.scss';

const ProfileBlock = () => {
  const { user } = useMoralis();

  return (
    <div className={styles.container}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url('/images/banner.jpg')` }}
      />

      <div className={styles.info}>
        <Link href="/">
          <a className={styles.infoAvatar}>
            <AccountImage large />
          </a>
        </Link>

        <Link href="/">
          <a className={styles.infoName}>
            <h3>{user?.attributes.displayName}</h3>
          </a>
        </Link>

        <span
          className={styles.infoWallet}
          onClick={() =>
            navigator.clipboard.writeText(user?.attributes.ethAddress)
          }
        >
          {`${user?.attributes.ethAddress.slice(
            0,
            5,
          )}...${user?.attributes.ethAddress.slice(
            user?.attributes.ethAddress.length - 10,
            -5,
          )}`}
        </span>
      </div>

      <div className={styles.numbers}>
        <div className={styles.numbersItem}>
          <h3>11</h3>
          <span>Posts</span>
        </div>

        <span className={styles.divider} />

        <div className={styles.numbersItem}>
          <h3>6,475</h3>
          <span>Followers</span>
        </div>
      </div>

      <RippleBtn className={styles.profileBtnRipple}>
        <Link href="/">
          <a className={styles.profileBtn}>My profile</a>
        </Link>
      </RippleBtn>
    </div>
  );
};

export default ProfileBlock;
