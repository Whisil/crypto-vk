import AccountImage from '@/components/unknown/accountImage';
import Link from 'next/link';
import LinkRippleBtn from '@/components/unknown/linkRippleBtn';
import { useAppSelector } from '@/app/hooks';
import { walletCut } from '@/utils/walletCut';

import styles from './styles.module.scss';

const ProfileBlock = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${
            user.bannerURL ? user.bannerURL : `/images/banner-placeholder.webp`
          })`,
        }}
      />

      <div className={styles.info}>
        <Link href="/">
          <a className={styles.infoAvatar}>
            <AccountImage large image={user.avatarURL} />
          </a>
        </Link>

        <Link href="/">
          <a className={styles.infoName}>
            <h3>{user.displayName}</h3>
          </a>
        </Link>

        <span
          className={styles.infoWallet}
          onClick={() => navigator.clipboard.writeText(user.ethAddress)}
        >
          {walletCut(user.ethAddress)}
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

      <LinkRippleBtn text="My profile" link={`/${user.ethAddress}`} />
    </div>
  );
};

export default ProfileBlock;
