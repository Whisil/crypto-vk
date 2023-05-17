import { useEffect, useState } from 'react';
import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'next/link';
import { formatTime } from '@/utils/formatTime';

interface Props {
  bio?: string;
  timestamp?: string;
  displayName?: string;
  href?: string;
  small?: boolean;
  xs?: boolean;
  className?: string;
}

const AccountInfo = ({
  bio,
  timestamp,
  displayName,
  href = ``,
  small,
  xs,
  className,
}: Props) => {
  const [time, setTime] = useState(``);

  useEffect(() => {
    if (time === `` && timestamp) {
      const formattedTime = formatTime(timestamp);
      setTime(formattedTime);

      const timeResetInterval = setInterval(() => formatTime(timestamp), 60000);

      return () => {
        clearInterval(timeResetInterval);
      };
    }
  }, [timestamp]); //eslint-disable-line

  return (
    <div
      className={classNames(
        styles.accountInfo,
        small && styles.small,
        xs && styles.xs,
      )}
    >
      {href.length !== 0 ? (
        <Link href={href}>
          <a>
            <AccountImage className={styles.avatar} small={small} xs={xs} />
          </a>
        </Link>
      ) : (
        <AccountImage className={styles.avatar} small={small} xs={xs} />
      )}
      <div
        className={classNames(
          styles.info,
          bio?.length != 0 && styles.textCut,
          className,
        )}
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
          {timestamp?.length != 0 && time}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
