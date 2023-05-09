import { useEffect, useState } from 'react';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import CommentContainer from '../commentContainer';
import Loader from '@/components/unknown/loader';
import Like from 'public/images/icons/like.svg';
import PostMenu from '../postMenu';
import PostInput from '../postInput';
import MediaContainer from '../mediaContainer';
import CommentInteraction from '../commentInteraction';
import { IPost } from '@/types/post';

import styles from './styles.module.scss';
import { useAppSelector } from '@/app/hooks';

const Post = ({ _id, createdAt, text, mediaURL, createdBy, likes }: IPost) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesArr, setLikesArr] = useState<string[]>(likes);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentLoader, setCommentLoader] = useState<boolean>(false);
  const [secondaryCommentLoader, setSecondaryCommentLoader] =
    useState<boolean>(false);
  const [commentInputFocus, setCommentInputFocus] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentFetchOffset, setCommentFetchOffset] = useState<number>(0);
  const [newCommentId, setNewCommentId] = useState<string>(``);
  const [commentDeleteId, setCommentDeleteId] = useState(``);
  const [noReplyCounter, setNoReplyCounter] = useState<number>(0);
  const [newRepliesSwitch, setNewRepliesSwitch] = useState<boolean>(false);

  const { user, token } = useAppSelector((state) => state.user);

  // const commentQuery = useMemo(
  //   () => new Moralis.Query(`Comment`),
  //   [Moralis.Query, newCommentId], // eslint-disable-line
  // );

  //New comment

  useEffect(() => {
    if (newCommentId.length !== 0) {
      // commentQuery.get(newCommentId).then((comment) => {
      //   setComments((comments) => [comment, ...comments]);
      // });
    }
  }, [newCommentId]);

  // Likes

  const handleLike = async () => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/post/${
      isLiked ? `removeLike` : `like`
    }/${_id}`;

    await fetch(fetchUrl, {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        if (isLiked) {
          setIsLiked(false);
          setLikesArr((prevState) =>
            prevState.filter((item) => item !== user._id),
          );
        } else {
          setIsLiked(true);
          setLikesArr((prevState) => [...prevState, user._id]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (likesArr.length !== 0 && likesArr.includes(user._id) && !isLiked) {
      setIsLiked(true);
    }
  }, [likesArr, user]); // eslint-disable-line

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo
          timestamp={createdAt}
          displayName={createdBy.displayName}
          href={`/${createdBy.ethAddress}`}
        />

        <PostMenu postId={_id} createdBy={createdBy} />
      </div>

      {text && <span className={styles.description}>{text}</span>}

      {mediaURL && <MediaContainer src={mediaURL} />}

      <div className={styles.info}>
        <div className={styles.likes}>
          <Like />
          <span className={styles.likesCount}>{likesArr.length} Likes</span>
        </div>

        {/* <div className={styles.comments} onClick={() => commentsShowToggle()}>
          0 comments
        </div> */}
      </div>

      <div className={styles.interactions}>
        <div onClick={handleLike} className={styles.btnWrapper}>
          <PostBtn variant="like" liked={isLiked} />
        </div>
        <PostBtn
          variant="comment"
          onClick={() => {
            // commentsShowToggle();
            setCommentInputFocus((commentInputFocus) => !commentInputFocus);
          }}
        />
        <PostBtn variant="share" bgTransparent />
      </div>

      {showComments && commentLoader ? (
        <Loader variant="small" relative />
      ) : showComments && !commentLoader ? (
        <>
          <div className={styles.commentsWrapper}>
            <PostInput
              commentInput
              commentInputFocus={commentInputFocus}
              commentedPostId={_id}
              newCommentInfo={(id: string) => setNewCommentId(id)}
            />
            {comments.map((item) => (
              <CommentContainer
                timestamp={item.attributes.createdAt}
                key={item.id}
                commentId={item.id}
                media={item.attributes?.media && item.attributes.media._url}
                text={item.attributes?.text}
                // handleCommentDelete={handleCommentDelete}
                createdById={item.attributes.createdBy.id}
                likeCount={item.attributes.likeCount}
                replyCount={item.attributes.replyCount}
                postId={_id}
                newRepliesSwitch={newRepliesSwitch}
              />
            ))}
            {secondaryCommentLoader && <Loader variant="small" relative />}
          </div>
          <CommentInteraction
            showMoreCondition={noReplyCounter - 3 - commentFetchOffset > 0}
            firstOnClick={() => {
              setCommentFetchOffset(
                (commentFetchOffset) => commentFetchOffset + 3,
              );
              setSecondaryCommentLoader(true);
            }}
            secondOnClick={() => {
              setComments([]);
              setShowComments(false);
              setCommentFetchOffset(0);
              setNewRepliesSwitch(true);
            }}
            counter={
              commentFetchOffset === 0
                ? noReplyCounter - 3
                : noReplyCounter - 3 - commentFetchOffset
            }
          />
        </>
      ) : null}
    </div>
  );
};

export default Post;
