import Post from '../post';
import PostInput from '../postInput';
import { useMoralisQuery } from 'react-moralis';

import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Loader from '@/components/unknown/loader';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<any[]>();
  const [loader, setLoader] = useState(true);

  const { fetch } = useMoralisQuery(`Posts`, (query) =>
    query.descending('createdAt'),
  );

  const userQuery = async () => {
    const result = await fetch();
    setFeedPosts(result);
    setLoader(false);
  };

  useEffect(() => {
    userQuery();
  }, []);

  return (
    <div className={styles.feed}>
      <PostInput />
      {loader && (
        <div className={styles.loaderWrapper}>
          <Loader variant="small" />
        </div>
      )}
      {feedPosts?.map((item: any, i: number) => (
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
