import { useState, useEffect, useCallback } from 'react';
import Post from './post';
import PostInput from './postInput';
import Loader from '@/components/unknown/loader';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setNewPost } from '@/features/postsSlice';
import SadFaceIcon from 'public/images/icons/sad-face.svg';

import styles from './styles.module.scss';

const Feed = () => {
  const [loader, setLoader] = useState(true);

  const { token } = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: `GET`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((posts) => {
        dispatch(setNewPost(posts));
      })
      .catch((err) => console.log(err));
    setLoader(false);
  }, [token, dispatch]);

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
            // commentCount={item.attributes.commentCount}
            likes={item.likes}
          />
        ))
      ) : (
        <div className={styles.noContent}>
          <SadFaceIcon className={styles.noContentIcon} />
          <span className={styles.noContentText}>Nothing here</span>
        </div>
      )}
    </div>
  );
};

export default Feed;
