import { useState } from 'react';
import Comment from '../comment';
import PostInput from '../postInput';

import styles from './styles.module.scss';

interface Props {
  timestamp?: string;
  commentId: string;
  media: string;
  text: string;
  handleCommentDelete?(id: string): void;
  createdById: string;
  likeCount: number;
  replyCount: number;
}

const CommentContainer = ({
  timestamp,
  commentId,
  media,
  text,
  handleCommentDelete,
  createdById,
  likeCount,
  replyCount,
}: Props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const handleShowReplies = () => {
    setShowReplies((showReplies) => !showReplies);
  };

  return (
    <ul>
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
        replyCount={replyCount}
      />

      <li>
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
        <ul className={styles.replyContainer}>
          <PostInput isReply replyOn={commentId} replyTo={createdById} />
        </ul>
      </li>
    </ul>
  );
};

export default CommentContainer;
