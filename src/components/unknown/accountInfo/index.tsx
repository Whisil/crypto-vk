import AccountImage from '../accountImage';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  bio?: string;
  timestamp?: string;
}

const AccountInfo = ({ bio, timestamp }: Props) => {
  return (
    <div className={styles.accountInfo}>
      <AccountImage className={styles.avatar} />
      <div
        className={classNames(styles.info, bio?.length != 0 && styles.textCut)}
      >
        <h4 className={styles.name}>David Haidamaka</h4>
        <span className={styles.infoSecondary}>
          {bio?.length != 0 && bio}
          {timestamp?.length != 0 && timestamp}
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
