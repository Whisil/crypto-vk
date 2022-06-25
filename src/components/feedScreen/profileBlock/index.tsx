import AccountImage from '@/components/unknown/accountImage';
import Link from 'next/link';
import styles from './styles.module.scss';

const ProfileBlock = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.banner}
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      />

      <div className={styles.info}>
        <Link href="#" passHref>
          <a className={styles.infoAvatar}>
            <AccountImage large />
          </a>
        </Link>

        <Link href="#" passHref>
          <a className={styles.infoName}>
            <h3>David Haidamaka</h3>
          </a>
        </Link>

        <span className={styles.infoBio}>
          This is my bio, what do you think?
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

      <Link href="#" passHref>
        <a className={styles.profileBtn}>My profile</a>
      </Link>
    </div>
  );
};

export default ProfileBlock;
