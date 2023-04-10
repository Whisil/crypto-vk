import { useState, useEffect } from 'react';
import AccountInfo from '@/components/unknown/accountInfo';
import PostMenu from '../postMenu';
import Like from 'public/images/icons/like.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';
import MediaContainer from '../mediaContainer';

interface Props {
  timestamp?: string;
  showReplies?: boolean;
  isReply?: boolean;
  handleShowReplies?(): void;
  handleShowInput?(): void;
  media: string;
  text: string;
  id: string;
  handleCommentDelete?(id: string): void;
  handleReplyDelete?(id: string): void;
  createdById: string;
  likeCount: number;
  replyCount?: number;
  handleReplyToReply?(username: string): void;
}

const Comment = ({
  timestamp,
  showReplies,
  handleShowReplies,
  handleShowInput,
  isReply,
  media,
  text,
  id,
  handleCommentDelete,
  handleReplyDelete,
  createdById,
  likeCount,
  replyCount,
  handleReplyToReply,
}: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    displayName: string;
    id: string;
    username: string;
  }>({ displayName: ``, id: ``, username: `` });
  const [likeCounter, setLikeCounter] = useState<number>(likeCount);
  const [likeId, setLikeId] = useState<string | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);

  //User fetching and like check
  // const commentQuery = new Moralis.Query(`Comment`);

  // useEffect(() => {
  //   Moralis.Cloud.run(`userFetch`, { id: createdById }).then((res) =>
  //     setUserInfo({
  //       id: res[0].id,
  //       displayName: res[0].attributes.displayName,
  //       username: res[0].attributes.username,
  //     }),
  //   );
  //   commentQuery.get(id).then(function (result) {
  //     result
  //       .relation(`likes`)
  //       .query()
  //       .equalTo(`likedBy`, user)
  //       .find()
  //       .then((res) => {
  //         setLikeId(res[0]?.id);
  //         if (res[0]) {
  //           setLiked(true);
  //         }
  //       });
  //   });
  // }, []);

  //Likes

  // const handleLike = async () => {
  //   const Like = Moralis.Object.extend(`Likes`);

  //   const newLike = new Like();
  //   newLike.save().then(() => {
  //     commentQuery.get(id).then((comment) => {
  //       comment.relation(`likes`).add(newLike);
  //       comment.increment(`likeCount`);
  //       setLikeId(newLike.id);
  //       newLike.set(`likedBy`, user);
  //       newLike.set(`likedComment`, comment);
  //       user?.relation(`likes`).add(newLike);
  //       user?.save();
  //       newLike.save();
  //       comment.save();
  //       setLiked(true);
  //       setLikeCounter((likeCounter) => likeCounter + 1);
  //     });
  //   });
  // };

  // const handleLikeRemove = async () => {
  //   const likeQuery = new Moralis.Query(`Likes`);
  //   if (likeId) {
  //     (await likeQuery.get(likeId)).destroy().then(() => {
  //       setLiked(false);
  //       setLikeId(undefined);
  //     });
  //     setLikeCounter((likeCounter) => likeCounter - 1);
  //   }

  //   commentQuery.get(id).then((comment) => {
  //     comment.decrement(`likeCount`);
  //     comment.save();
  //   });
  // };

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
          displayName={userInfo.displayName}
          timestamp={timestamp}
        />
        {showMenu && (
          <PostMenu
            commentId={id}
            variant="comment"
            handleCommentDelete={handleCommentDelete}
            handleReplyDelete={handleReplyDelete}
            userId={createdById}
          />
        )}
      </div>

      <div className={styles.marginContainer}>
        <div className={styles.commentInner}>
          <span>{text}</span>
          {media && <MediaContainer commentMedia src={media} />}
        </div>

        <div className={styles.commentBottom}>
          <div
            className={classNames(styles.commentBtn, styles.likes)}
            // onClick={likeId === `` || !likeId ? handleLike : handleLikeRemove}
          >
            <Like
              className={classNames(styles.likeIcon, liked && styles.liked)}
            />
            <span>{likeCounter} Likes</span>
          </div>

          <div
            className={styles.commentBtn}
            onClick={() => {
              handleShowInput && handleShowInput();
              isReply &&
                handleReplyToReply &&
                handleReplyToReply(userInfo.username);
            }}
          >
            <span>Reply</span>
          </div>
          {!isReply && replyCount! >= 1 && (
            <div
              className={styles.commentBtn}
              onClick={() => handleShowReplies && handleShowReplies()}
            >
              <span>
                {showReplies ? `Hide replies` : `Show replies (${replyCount})`}
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
