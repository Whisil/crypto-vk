import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Image from 'next/image';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import Comment from '../comment';
import Like from 'public/images/icons/like.svg';

import styles from './styles.module.scss';
import PostMenu from '../postMenu';

interface Props {
  postId: string;
  timestamp: any;
  text?: string;
  media?: string;
  handlePostDelete?: any;
}

const Post = ({ postId, timestamp, text, media, handlePostDelete }: Props) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [likeId, setLikeId] = useState<string | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCounter, setLikeCounter] = useState<number>(0);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

  //User fetching

  useEffect(() => {
    postQuery.get(postId).then(function (result: any) {
      result
        .relation(`createdBy`)
        .query()
        .find()
        .then((res: any) => setUserInfo(res[0]));
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
        newLike.relation(`likedPost`).add(post);
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

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo
          timestamp={timestamp}
          displayName={userInfo && userInfo.attributes.displayName}
          href="/"
        />

        <PostMenu
          handlePostDelete={handlePostDelete}
          postId={postId}
          userId={userInfo?.id}
        />
      </div>

      {text && <span className={styles.description}>{text}</span>}

      {media && (
        <div className={styles.media}>
          <Image
            className={styles.mediaContent}
            src={media}
            layout="fill"
            objectFit="contain"
            alt="post media"
          />
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.likes}>
          <Like />
          <span className={styles.likesCount}>{likeCounter} Likes</span>
        </div>

        <div className={styles.comments}>45 comments</div>
      </div>

      <div className={styles.interactions}>
        <div
          onClick={likeId === `` || !likeId ? handleLike : handleLikeRemove}
          className={styles.btnWrapper}
        >
          <PostBtn variant="like" liked={liked} />
        </div>
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>

      <div className={styles.commentsWrapper}>
        <Comment timestamp={timestamp} />
        <Comment timestamp={timestamp} />
      </div>
    </div>
  );
};

export default Post;
