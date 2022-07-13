import Post from '../post';
import PostInput from '../postInput';
import { useMoralisQuery } from 'react-moralis';

import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<any>([]);

  const { fetch } = useMoralisQuery(`Posts`);
  const postsQuery = () => {
    fetch({
      onSuccess: (posts) => {
        setFeedPosts(posts);
      },
      onError: (error) => {
        alert(error);
      },
    });
  };
  useEffect(() => {
    postsQuery();
  }, []);

  return (
    <div className={styles.feed}>
      <PostInput />
      {feedPosts.map((item: any, i: number) => (
        <Post
          key={i}
          postId={item.attributes.createdBy.parent.id}
          timestamp={item.attributes.createdAt}
          text={item.attributes.text}
          media={item.attributes.media && item.attributes.media._url}
        />
      ))}
    </div>
  );
};

export default Feed;
