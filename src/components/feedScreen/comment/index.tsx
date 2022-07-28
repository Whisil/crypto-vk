import { useState } from 'react';
import AccountInfo from '@/components/unknown/accountInfo';
import PostMenu from '../postMenu';
import Like from 'public/images/icons/like.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  timestamp?: string;
  showReplies?: boolean;
  isReply?: boolean;
  handleShowReplies?(): void;
}

const Comment = ({
  timestamp,
  showReplies,
  handleShowReplies,
  isReply,
}: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <li
      className={classNames(styles.comment, isReply && styles.isReply)}
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className={styles.commentUpper}>
        <AccountInfo
          small={!isReply}
          xs={isReply}
          href="/"
          displayName="David Haidamaka"
          timestamp={timestamp}
        />
        <div className="">{showMenu && <PostMenu variant="comment" />}</div>
      </div>

      <div className={styles.marginContainer}>
        <div className={styles.commentInner}>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>

        <div className={styles.commentBottom}>
          <div className={classNames(styles.commentBtn, styles.likes)}>
            <Like className={styles.likeIcon} />
            <span>1 321 Likes</span>
          </div>

          <div className={styles.commentBtn}>
            <span>Reply</span>
          </div>
          {!isReply && (
            <div
              className={styles.commentBtn}
              onClick={() => handleShowReplies && handleShowReplies()}
            >
              <span>{showReplies ? `Hide replies` : `Show replies (53)`}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
