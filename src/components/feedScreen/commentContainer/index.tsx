import { useState } from 'react';
import Comment from '../comment';

import styles from './styles.module.scss';

interface Props {
  timestamp?: string;
}

const CommentContainer = ({ timestamp }: Props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const handleShowReplies = () => {
    setShowReplies((showReplies) => !showReplies);
  };

  return (
    <>
      <Comment
        timestamp={timestamp}
        showReplies={showReplies}
        handleShowReplies={handleShowReplies}
      />
      {showReplies && (
        <ul className={styles.replyContainer}>
          <Comment timestamp={timestamp} isReply />
          <Comment timestamp={timestamp} isReply />
          <Comment timestamp={timestamp} isReply />
          <Comment timestamp={timestamp} isReply />
        </ul>
      )}
    </>
  );
};

export default CommentContainer;
