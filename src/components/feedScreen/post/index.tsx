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
  likeCount: number;
  handlePostDelete?: any;
}

const Post = ({
  postId,
  timestamp,
  text,
  media,
  likeCount,
  handlePostDelete,
}: Props) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [likeId, setLikeId] = useState<string>(``);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

  //User fetching

  useEffect(() => {
    const query = new Moralis.Query(`Posts`);
    query.get(postId).then(function (result: any) {
      result
        .relation(`createdBy`)
        .query()
        .find()
        .then((res: any) => setUserInfo(res[0]));
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
        newLike.relation(`likedBy`).add(user);
        newLike.relation(`likedPost`).add(post);
        user?.relation(`likes`).add(newLike);
        user?.save();
        newLike.save();
        post.save();
      });
    });
  };

  const handleLikeRemove = async () => {
    const likeQuery = new Moralis.Query(`Likes`);
    (await likeQuery.get(likeId)).destroy().then(() => setLikeId(``));

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
          <span className={styles.likesCount}>
            {likeId !== `` ? likeCount + 1 : likeCount} Likes
          </span>
        </div>

        <div className={styles.comments}>45 comments</div>
      </div>

      <div className={styles.interactions}>
        <div
          onClick={likeId === `` ? handleLike : handleLikeRemove}
          className={styles.btnWrapper}
        >
          <PostBtn variant="like" liked={likeId !== `` && true} />
        </div>
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>

      <div className={styles.commentsWrapper}>
        <Comment />
      </div>
    </div>
  );
};

export default Post;
