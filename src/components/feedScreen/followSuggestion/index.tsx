import AccentBtn from '@/components/unknown/accentBtn';
import AccountInfo from '@/components/unknown/accountInfo';
import Link from 'next/link';
import styles from './styles.module.scss';

const FollowSuggestion = () => {
  return (
    <Link href="#">
      <a className={styles.item}>
        <AccountInfo bio="That's my bio, it's not much but" />
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
