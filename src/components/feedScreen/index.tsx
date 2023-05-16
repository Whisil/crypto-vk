import { useState, useEffect, useCallback } from 'react';
import Post from './post';
import PostInput from './postInput';
import Loader from '@/components/unknown/loader';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPosts } from '@/features/postsSlice';

import styles from './styles.module.scss';
import NoContent from '../unknown/noContent';

const Feed = () => {
  const [loader, setLoader] = useState(true);

  const { token } = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    if (posts.length === 0) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
        method: `GET`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((resPosts) => {
          dispatch(setPosts(resPosts));
        })
        .catch((err) => console.log(err));
    }
    setLoader(false);
  }, [token, dispatch]); // eslint-disable-line

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className={styles.feed}>
      <PostInput />
      {loader ? (
        <div className={styles.loaderWrapper}>
          <Loader variant="small" />
        </div>
      ) : posts.length !== 0 ? (
        posts.map((item) => (
          <Post
            key={item._id}
            _id={item._id}
            createdAt={item.createdAt}
            text={item.text}
            mediaURL={item.mediaURL && item.mediaURL}
            createdBy={item.createdBy}
            comments={item.comments}
            likes={item.likes}
          />
        ))
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default Feed;
