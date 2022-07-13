import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  bio?: string;
  timestamp?: string;
  displayName?: string;
}

const AccountInfo = ({ bio, timestamp, displayName }: Props) => {
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
      return Math.floor(diff / periods.day) + ` days ago`;
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + ` hours ago`;
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + ` minutes ago`;
    }
    return `Just now`;
  }

  return (
    <div className={styles.accountInfo}>
      <AccountImage className={styles.avatar} />
      <div
        className={classNames(styles.info, bio?.length != 0 && styles.textCut)}
      >
        <h4 className={styles.name}>{displayName}</h4>
        <span className={styles.infoSecondary}>
          {bio?.length != 0 && bio}
          {timestamp?.length != 0 && formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
