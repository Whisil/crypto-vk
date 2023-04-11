import { useState, useEffect, useMemo } from 'react';
import Post from './post';
import PostInput from './postInput';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState(true);
  const [newPostId, setNewPostId] = useState(``);
  const [postDeleteId, setPostDeleteId] = useState(``);

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
        feedPosts.filter((post) => post.id !== postDeleteId),
      );

      setPostDeleteId(``);
      // });
    }
  }, []);

  //Pushing state

  const postedPostInfo = (id: string) => {
    setNewPostId(id);
  };

  const handlePostDelete = (id: string) => {
    setPostDeleteId(id);
  };

  //Post fetch Query

  useEffect(() => {
    const postsQuery = () => {
      // postQuery
      //   .descending(`createdAt`)
      //   .find()
      //   .then((posts) => {
      //     setFeedPosts(posts);
      //   })
      //   .then(() => setLoader(false));
    };
    postsQuery();
  }, []);

  return (
    <div className={styles.feed}>
      <PostInput postedPostInfo={postedPostInfo} />
      {loader && (
        <div className={styles.loaderWrapper}>
          <Loader variant="small" />
        </div>
      )}
      <div id="feed">
        {feedPosts?.map((item) => (
          <Post
            key={item.id}
            postId={item.id}
            timestamp={item.attributes.createdAt}
            text={item.attributes.text}
            media={item.attributes.media && item.attributes.media._url}
            handlePostDelete={handlePostDelete}
            createdBy={item.attributes.createdBy}
            commentCount={item.attributes.commentCount}
            likeCount={item.attributes.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
