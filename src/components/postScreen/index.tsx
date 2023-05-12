import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import Post from '@/components/feedScreen/post';
import { IPost } from '@/types/post';
import Loader from '@/components/unknown/loader';

import GoBackIcon from '@/public/images/icons/go-back.svg';

import styles from './styles.module.scss';

const PostScreen = () => {
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState<IPost>();

  const { token } = useAppSelector((state) => state.user);

  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${router.query.postId}`,
      {
        method: `GET`,
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((resPosts) => {
        setPost(resPosts);
      })
      .catch((err) => console.log(err));
    setLoader(false);
  }, [token]); // eslint-disable-line

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <button className={styles.goBackBtn} onClick={() => router.back()}>
        <GoBackIcon />
        <span className={styles.goBackBtnText}>Go Back</span>
      </button>

      {loader ? (
        <Loader />
      ) : !post ? (
        `there's nothing here`
      ) : (
        <Post
          key={post._id}
          _id={post._id}
          createdAt={post.createdAt}
          text={post.text}
          mediaURL={post.mediaURL && post.mediaURL}
          createdBy={post.createdBy}
          // commentCount={item.attributes.commentCount}
          likes={post.likes}
        />
      )}
    </div>
  );
};

export default PostScreen;
