import { useEffect, useState } from 'react';
import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'next/link';
import { formatTime } from '@/utils/formatTime';

interface Props {
  username?: string;
  timestamp?: string;
  displayName?: string;
  href?: string;
  small?: boolean;
  xs?: boolean;
  className?: string;
  image: string | null;
}

const AccountInfo = ({
  username,
  timestamp,
  displayName,
  href = ``,
  small,
  xs,
  className,
  image,
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
            <AccountImage
              image={image}
              className={styles.avatar}
              small={small}
              xs={xs}
            />
          </a>
        </Link>
      ) : (
        <AccountImage
          image={image}
          className={styles.avatar}
          small={small}
          xs={xs}
        />
      )}
      <div className={classNames(styles.info, className)}>
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
          {timestamp?.length != 0 && time}
          {username && `@` + username}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
