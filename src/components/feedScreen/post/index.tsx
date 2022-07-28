import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import CommentContainer from '../commentContainer';
import Like from 'public/images/icons/like.svg';

import styles from './styles.module.scss';
import PostMenu from '../postMenu';
import PostInput from '../postInput';
import MediaContainer from '../mediaContainer';

interface Props {
  postId: string;
  timestamp: any;
  text?: string;
  media?: string;
  handlePostDelete?: any;
  createdBy: any;
}

const Post = ({
  postId,
  timestamp,
  text,
  media,
  handlePostDelete,
  createdBy,
}: Props) => {
  const [userInfo, setUserInfo] = useState<string>(``);
  const [likeId, setLikeId] = useState<string | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCounter, setLikeCounter] = useState<number>(0);
  const [showComments, setShowComments] = useState<boolean>(true);
  const [commentInputFocus, setCommentInputFocus] = useState<boolean>(false);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

  //User fetching and like check

  useEffect(() => {
    Moralis.Cloud.run(`userFetch`, { id: createdBy.id }).then((res) =>
      setUserInfo(res[0].attributes.displayName),
    );
    postQuery.get(postId).then(function (result: any) {
      result
        .relation(`likes`)
        .query()
        .equalTo(`likedBy`, user)
        .find()
        .then((res: any) => {
          setLikeId(res[0]?.id);
          if (res[0]) {
            setLiked(true);
          }
        });
    });
  }, []);

  useEffect(() => {
    postQuery
      .get(postId)
      .then((res: any) => setLikeCounter(res.attributes.likeCount));
  }, [likeId]);

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
    }

    const postQuery = new Moralis.Query(`Posts`);
    postQuery.get(postId).then((post) => {
      post.decrement(`likeCount`);
      post.save();
    });
  };

  //Comments

  const commentsFetch = () => {
    postQuery.get(postId).then((res: any) =>
      res
        .relation(`comments`)
        .query()
        .find({
          success: function (comments: any) {
            console.log(comments);
          },
        }),
    );
  };

  useEffect(() => {
    commentsFetch();
  }, []);

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

        <div className={styles.comments} onClick={() => setShowComments(true)}>
          45 comments
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
            setShowComments(true);
            setCommentInputFocus((commentInputFocus) => !commentInputFocus);
          }}
        />
        <PostBtn variant="share" bgTransparent />
      </div>

      {showComments && (
        <ul className={styles.commentsWrapper}>
          <PostInput
            commentInput
            commentInputFocus={commentInputFocus}
            commentedPostId={postId}
          />
          <CommentContainer timestamp={timestamp} />
          <CommentContainer timestamp={timestamp} />
        </ul>
      )}
    </div>
  );
};

export default Post;
