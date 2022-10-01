import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import CommentContainer from '../commentContainer';
import Loader from '@/components/unknown/loader';
import Like from 'public/images/icons/like.svg';

import styles from './styles.module.scss';
import PostMenu from '../postMenu';
import PostInput from '../postInput';
import MediaContainer from '../mediaContainer';
import CommentInteraction from '../commentInteraction';

interface Props {
  postId: string;
  timestamp: string;
  text?: string;
  media?: string;
  handlePostDelete?(id: string): void;
  createdBy: { id: string };
  commentCount: number;
  likeCount: number;
}

const Post = ({
  postId,
  timestamp,
  text,
  media,
  handlePostDelete,
  createdBy,
  commentCount,
  likeCount,
}: Props) => {
  const [userInfo, setUserInfo] = useState<{
    displayName: string;
    username: string;
  }>({ username: ``, displayName: `` });
  const [likeId, setLikeId] = useState<string | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCounter, setLikeCounter] = useState<number>(likeCount);
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

  const { Moralis, user } = useMoralis();

  const postQuery = useMemo(() => new Moralis.Query(`Posts`), [Moralis.Query]);
  const commentQuery = useMemo(
    () => new Moralis.Query(`Comment`),
    [Moralis.Query, newCommentId], // eslint-disable-line
  );

  //New comment

  useEffect(() => {
    if (newCommentId.length !== 0) {
      commentQuery.get(newCommentId).then((comment) => {
        setComments((comments) => [comment, ...comments]);
      });
    }
  }, [newCommentId, commentQuery]);

  //User fetching and like check

  useEffect(() => {
    Moralis.Cloud.run(`userFetch`, { id: createdBy.id }).then((res) =>
      setUserInfo({
        displayName: res[0].attributes.displayName,
        username: res[0].attributes.username,
      }),
    );
    postQuery.get(postId).then(function (result) {
      result
        .relation(`likes`)
        .query()
        .equalTo(`likedBy`, user)
        .find()
        .then((res) => {
          setLikeId(res[0]?.id);
          if (res[0]) {
            setLiked(true);
          }
        });
    });
  }, [Moralis.Cloud, createdBy.id, postId, postQuery, user]);

  // Likes

  const handleLike = async () => {
    const Like = Moralis.Object.extend(`Likes`);

    const newLike = new Like();
    newLike.save().then(() => {
      postQuery.get(postId).then((post) => {
        post.relation(`likes`).add(newLike);
        post.increment(`likeCount`);
        setLikeId(newLike.id);
        newLike.set(`likedBy`, user);
        newLike.set(`likedPost`, post);
        user?.relation(`likes`).add(newLike);
        user?.save();
        newLike.save();
        post.save();
        setLiked(true);
        setLikeCounter((likeCounter) => likeCounter + 1);
      });
    });
  };

  const handleLikeRemove = async () => {
    const likeQuery = new Moralis.Query(`Likes`);
    if (likeId) {
      (await likeQuery.get(likeId)).destroy().then(() => {
        setLiked(false);
        setLikeId(undefined);
      });
      setLikeCounter((likeCounter) => likeCounter - 1);
    }

    postQuery.get(postId).then((post) => {
      post.decrement(`likeCount`);
      post.save();
    });
  };

  //Comments

  const commentFetch = useCallback(() => {
    postQuery.get(postId).then((res) => {
      res
        .relation(`comments`)
        .query()
        .equalTo(`replyTo`, undefined)
        .limit(3)
        .skip(commentFetchOffset)
        .find()
        .then((fetchedComments) => {
          if (comments.length === 0) {
            setComments(fetchedComments);
          } else {
            setComments([...comments, ...fetchedComments]);
          }
          setCommentLoader(false);
          setSecondaryCommentLoader(false);
        });
    });
  }, [commentFetchOffset, comments, postId, postQuery]);

  const commentsShowToggle = () => {
    if (!showComments) {
      setCommentLoader(true);
      commentFetch();
      setShowComments(true);
      postQuery.get(postId).then((res) => {
        commentQuery.equalTo(`replyTo`, undefined).equalTo(`onPost`, res);
        commentQuery.count().then((res) => setNoReplyCounter(res));
      });
    } else {
      setComments([]);
      setShowComments(false);
      setNoReplyCounter(0);
    }
  };

  useEffect(() => {
    if (commentFetchOffset !== 0) {
      commentFetch();
    }
  }, [commentFetchOffset, commentFetch]);

  //Comment Delete

  const handleCommentDelete = (id: string) => {
    setCommentDeleteId(id);
  };

  useEffect(() => {
    if (commentDeleteId !== ``) {
      postQuery.get(postId).then((post) => {
        post.decrement(`commentCount`);
        post.save();
      });
      commentQuery.get(commentDeleteId).then((comment) => {
        const likeQuery = new Moralis.Query(`Likes`);
        likeQuery
          .equalTo(`likedComment`, comment)
          .find()
          .then((res) => Moralis.Object.destroyAll(res));

        comment.destroy();

        setComments((comments) =>
          comments.filter((comment) => comment.id !== commentDeleteId),
        );

        setCommentDeleteId(``);
      });
    }
  }, [
    commentDeleteId,
    Moralis.Object,
    Moralis.Query,
    commentQuery,
    postId,
    postQuery,
  ]);

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo
          timestamp={timestamp}
          displayName={userInfo.displayName}
          href={`/${createdBy.id}`}
        />

        <PostMenu
          handlePostDelete={handlePostDelete}
          postId={postId}
          userId={createdBy.id}
        />
      </div>

      {text && <span className={styles.description}>{text}</span>}

      {media && <MediaContainer src={media} />}

      <div className={styles.info}>
        <div className={styles.likes}>
          <Like />
          <span className={styles.likesCount}>{likeCounter} Likes</span>
        </div>

        <div className={styles.comments} onClick={() => commentsShowToggle()}>
          {commentCount} comments
        </div>
      </div>

      <div className={styles.interactions}>
        <div
          onClick={likeId === `` || !likeId ? handleLike : handleLikeRemove}
          className={styles.btnWrapper}
        >
          <PostBtn variant="like" liked={liked} />
        </div>
        <PostBtn
          variant="comment"
          onClick={() => {
            commentsShowToggle();
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
              commentedPostId={postId}
              newCommentInfo={(id: string) => setNewCommentId(id)}
            />
            {comments.map((item) => (
              <CommentContainer
                timestamp={item.attributes.createdAt}
                key={item.id}
                commentId={item.id}
                media={item.attributes?.media && item.attributes.media._url}
                text={item.attributes?.text}
                handleCommentDelete={handleCommentDelete}
                createdById={item.attributes.createdBy.id}
                likeCount={item.attributes.likeCount}
                replyCount={item.attributes.replyCount}
                postId={postId}
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
