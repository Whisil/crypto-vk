import { useEffect, useState } from 'react';
import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'next/link';

interface Props {
  bio?: string;
  timestamp?: string;
  displayName?: string;
  href?: string;
  small?: boolean;
}

const AccountInfo = ({
  bio,
  timestamp = undefined,
  displayName,
  href = ``,
  small,
}: Props) => {
  const [time, setTime] = useState(``);

  const periods = {
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  function formatTime(createdAt: any) {
    const diff = Date.now() - createdAt;

    if (diff > periods.week) {
      setTime(Math.floor(diff / periods.week) + ` weeks ago`);
    } else if (diff > periods.day) {
      if (Math.floor(diff / periods.day) === 1) {
        setTime(Math.floor(diff / periods.day) + ` day ago`);
      } else {
        setTime(Math.floor(diff / periods.day) + ` days ago`);
      }
    } else if (diff > periods.hour) {
      setTime(Math.floor(diff / periods.hour) + ` hours ago`);
    } else if (diff > periods.minute) {
      setTime(Math.floor(diff / periods.minute) + ` minutes ago`);
    } else {
      setTime(`Just now`);
    }
  }

  useEffect(() => {
    if (time === ``) {
      formatTime(timestamp);
    }

    const timeResetInterval = setInterval(() => formatTime(timestamp), 60000);

    return () => {
      clearInterval(timeResetInterval);
    };
  }, [time]);

  return (
    <div className={classNames(styles.accountInfo, small && styles.small)}>
      {href.length !== 0 ? (
        <Link href={href}>
          <a>
            <AccountImage className={styles.avatar} small={small} />
          </a>
        </Link>
      ) : (
        <AccountImage className={styles.avatar} small={small} />
      )}
      <div
        className={classNames(styles.info, bio?.length != 0 && styles.textCut)}
      >
        {href.length !== 0 ? (
          <Link href={href}>
            <a>
              <h4 className={styles.name}>{displayName}</h4>
            </a>
          </Link>
        ) : (
          <h4 className={styles.name}>{displayName}</h4>
        )}
        <span className={styles.infoSecondary}>
          {bio?.length != 0 && bio}
          {timestamp && timestamp?.length != 0 && time}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
