import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'next/link';

interface Props {
  bio?: string;
  timestamp?: string;
  displayName?: string;
  separateLink?: boolean;
}

const AccountInfo = ({ bio, timestamp, displayName, separateLink }: Props) => {
  const periods = {
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  function formatTime(createdAt: any) {
    const diff = Date.now() - createdAt;

    if (diff > periods.week) {
      return Math.floor(diff / periods.week) + ` weeks ago`;
    } else if (diff > periods.day) {
      if (Math.floor(diff / periods.day) === 1) {
        return Math.floor(diff / periods.day) + ` day ago`;
      } else {
        return Math.floor(diff / periods.day) + ` days ago`;
      }
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + ` hours ago`;
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + ` minutes ago`;
    }
    return `Just now`;
  }

  return (
    <div className={styles.accountInfo}>
      {separateLink ? (
        <Link href="/">
          <a>
            <AccountImage className={styles.avatar} />
          </a>
        </Link>
      ) : (
        <AccountImage className={styles.avatar} />
      )}
      <div
        className={classNames(styles.info, bio?.length != 0 && styles.textCut)}
      >
        {separateLink ? (
          <Link href="/">
            <a>
              <h4 className={styles.name}>{displayName}</h4>
            </a>
          </Link>
        ) : (
          <h4 className={styles.name}>{displayName}</h4>
        )}
        <span className={styles.infoSecondary}>
          {bio?.length != 0 && bio}
          {timestamp?.length != 0 && formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
