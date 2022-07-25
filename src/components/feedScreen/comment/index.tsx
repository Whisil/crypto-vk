import AccountInfo from '@/components/unknown/accountInfo';
import PostMenu from '../postMenu';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  timestamp?: string;
  createdBy?: string;
}

const Comment = ({ timestamp, createdBy }: Props) => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentUpper}>
        <AccountInfo
          small
          href="/"
          displayName="David Haidamaka"
          timestamp={timestamp}
        />
        <PostMenu variant="comment" />
      </div>

      <div className={styles.commentInner}>
        <span>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </span>
      </div>
    </div>
  );
};

export default Comment;
