import { useState, useEffect, useMemo, useCallback } from 'react';
import Post from './post';
import PostInput from './postInput';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';
import { IPost } from '@/types/post';
import { useAppSelector } from '@/app/hooks';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<IPost[]>([]);
  const [loader, setLoader] = useState(true);
  const [newPostId, setNewPostId] = useState(``);
  const [postDeleteId, setPostDeleteId] = useState(``);

  const { token } = useAppSelector((state) => state.user);

  const fetchPosts = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: `GET`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((posts) => setFeedPosts(posts))
      .catch((err) => console.log(err));
    setLoader(false);
  }, [token]);

  useEffect(() => {
    // if (newPostId !== ``) {
    //   postQuery.get(newPostId).then((post) => {
    //     setFeedPosts((feedPosts) => [post, ...feedPosts]);
    //   });
    // }
  }, []);

  //Post Delete

  useEffect(() => {
    if (postDeleteId !== ``) {
      // postQuery.get(postDeleteId).then(async (post) => {
      //   await post.attributes.likes
      //     .query()
      //     .find()
      //     .then((res: any[]) => Moralis.Object.destroyAll(res));
      //   await post.attributes.comments
      //     .query()
      //     .find()
      //     .then((res: any[]) => Moralis.Object.destroyAll(res));

      //   post.destroy();

      setFeedPosts((feedPosts) =>
        feedPosts.filter((post) => post._id !== postDeleteId),
      );

      setPostDeleteId(``);
      // });
    }
  }, [postDeleteId]);

  //Pushing state

  const setNewPost = (post: IPost) => {
    setFeedPosts((state) => [post, ...state]);
  };

  const handlePostDelete = (id: string) => {
    setPostDeleteId(id);
  };

  //Post fetch Query

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  console.log(feedPosts);
  return (
    <div className={styles.feed}>
      <PostInput setNewPost={setNewPost} />
      {loader && (
        <div className={styles.loaderWrapper}>
          <Loader variant="small" />
        </div>
      )}
      <div id="feed">
        {feedPosts.map((item) => (
          <Post
            key={item._id}
            _id={item._id}
            createdAt={item.createdAt}
            text={item.text}
            mediaURL={item.mediaURL && item.mediaURL}
            handlePostDelete={handlePostDelete}
            createdBy={item.createdBy}
            // commentCount={item.attributes.commentCount}
            likeCount={item.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
