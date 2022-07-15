import { useState, useEffect } from 'react';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import Post from '../post';
import PostInput from '../postInput';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<any[]>();
  const [loader, setLoader] = useState(true);
  const [justPostedId, setJustPostedId] = useState(``);
  const [justPostedPost, setJustPostedPost] = useState<any>([]);

  const { Moralis } = useMoralis();

  useEffect(() => {
    if (justPostedId !== ``) {
      const postedPostQuery = new Moralis.Query(`Posts`);
      postedPostQuery
        .get(justPostedId)
        .then((post) => setJustPostedPost([post, ...justPostedPost]));
    }
  }, [justPostedId]);

  const { fetch } = useMoralisQuery(`Posts`, (query) =>
    query.descending(`createdAt`),
  );

  const postedPostInfo = (id: string) => {
    setJustPostedId(id);
  };

  const postsQuery = async () => {
    const result = await fetch();
    setFeedPosts(result);
    setLoader(false);
  };

  useEffect(() => {
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
        {justPostedPost &&
          justPostedPost.length >= 1 &&
          justPostedPost.map((item: any, i: number) => (
            <Post
              key={i}
              postId={item.id}
              timestamp={item.attributes.createdAt}
              text={item.attributes.text}
              media={item.attributes.media && item.attributes.media._url}
              likeCount={item.attributes.likeCount && item.attributes.likeCount}
            />
          ))}
        {feedPosts?.map((item: any, i: number) => (
          <Post
            key={i}
            postId={item.id}
            timestamp={item.attributes.createdAt}
            text={item.attributes.text}
            media={item.attributes.media && item.attributes.media._url}
            likeCount={item.attributes.likeCount && item.attributes.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
