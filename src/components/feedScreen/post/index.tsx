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
import { useRouter } from 'next/router';

const Post = ({ _id, createdAt, text, mediaURL, createdBy, likes }: IPost) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesArr, setLikesArr] = useState<string[]>(likes);

  const { user, token } = useAppSelector((state) => state.user);

  const router = useRouter();

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
    <div className={styles.post} onClick={() => router.push(`/post/${_id}`)}>
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

        <div className={styles.comments}>0 comments</div>
      </div>

      <div className={styles.interactions}>
        <div onClick={handleLike} className={styles.btnWrapper}>
          <PostBtn variant="like" liked={isLiked} />
        </div>
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>
    </div>
  );
};

export default Post;
