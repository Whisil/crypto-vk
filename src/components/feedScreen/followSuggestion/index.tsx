import AccentBtn from '@/components/unknown/accentBtn';
import AccountImage from '@/components/unknown/accountImage';
import Link from 'next/link';
import styles from './styles.module.scss';

const FollowSuggestion = () => {
  return (
    <Link href="#" passHref>
      <a className={styles.item}>
        <AccountImage className={styles.itemAvatar} />
        <div className={styles.itemInfo}>
          <h4 className={styles.itemName}>David Haidamaka</h4>
          <span className={styles.itemBio}>
            This is my bio, it's not much but still, isn't that cool?
          </span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className={styles.followBtn}
        >
          <AccentBtn text="Follow" />
        </div>
      </a>
    </Link>
  );
};

export default FollowSuggestion;
