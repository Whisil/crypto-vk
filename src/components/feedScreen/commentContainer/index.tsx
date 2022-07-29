import { useState } from 'react';
import Comment from '../comment';

import styles from './styles.module.scss';

interface Props {
  timestamp?: string;
  commentId: string;
  media: string;
  text: string;
  handleCommentDelete?(id: string): void;
  createdById: string;
  likeCount: number;
}

const CommentContainer = ({
  timestamp,
  commentId,
  media,
  text,
  handleCommentDelete,
  createdById,
  likeCount,
}: Props) => {
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
        media={media}
        text={text}
        id={commentId}
        handleCommentDelete={handleCommentDelete}
        createdById={createdById}
        likeCount={likeCount}
      />
      {/* {showReplies && (
        <ul className={styles.replyContainer}>
          <Comment
            timestamp={timestamp}
            showReplies={showReplies}
            handleShowReplies={handleShowReplies}
            media={media}
            text={text}
            id={commentId}
          />
        </ul>
      )} */}
    </>
  );
};

export default CommentContainer;
