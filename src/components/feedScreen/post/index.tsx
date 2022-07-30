import { useEffect, useState } from 'react';
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
  const [userInfo, setUserInfo] = useState<string>(``);
  const [likeId, setLikeId] = useState<string | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCounter, setLikeCounter] = useState<number>(likeCount);
  const [commentCounter, setCommentCounter] = useState<number>(commentCount);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentLoader, setCommentLoader] = useState<boolean>(false);
  const [commentInputFocus, setCommentInputFocus] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentId, setNewCommentId] = useState(``);
  const [commentDeleteId, setCommentDeleteId] = useState(``);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);
  const commentQuery = new Moralis.Query(`Comment`);

  //New comment

  const newCommentInfo = (id: string) => {
    setNewCommentId(id);
  };

  useEffect(() => {
    if (newCommentId !== ``) {
      commentQuery.get(newCommentId).then((comment) => {
        setComments((comments) => [comment, ...comments]);
        setCommentCounter((commentCounter) => commentCounter + 1);
      });
    }
  }, [newCommentId]);

  //User fetching and like check

  useEffect(() => {
    Moralis.Cloud.run(`userFetch`, { id: createdBy.id }).then((res) =>
      setUserInfo(res[0].attributes.displayName),
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
  }, []);

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

  const commentsShowToggle = () => {
    if (!showComments) {
      setShowComments(true);
      setCommentLoader(true);
      postQuery.get(postId).then((res) =>
        res
          .relation(`comments`)
          .query()
          .find()
          .then((comments) => {
            setComments(comments);
            setCommentLoader(false);
          }),
      );
    } else {
      setShowComments(false);
      setComments([]);
    }
  };

  //Comment Delete

  const handleCommentDelete = (id: string) => {
    setCommentDeleteId(id);
  };

  useEffect(() => {
    if (commentDeleteId !== ``) {
      setCommentCounter((commentCounter) => commentCounter - 1);
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
  }, [commentDeleteId]);

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo timestamp={timestamp} displayName={userInfo} href="/" />

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
          {commentCounter} comments
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
        <ul className={styles.commentsWrapper}>
          <PostInput
            commentInput
            commentInputFocus={commentInputFocus}
            commentedPostId={postId}
            newCommentInfo={newCommentInfo}
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
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Post;
