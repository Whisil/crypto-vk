import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Post from '../post';
import PostInput from '../postInput';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState(true);
  const [justPostedId, setJustPostedId] = useState(``);
  const [justPostedPost, setJustPostedPost] = useState<any[]>([]);
  const [postDeleteId, setPostDeleteId] = useState(``);

  const { Moralis } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

  useEffect(() => {
    if (justPostedId !== ``) {
      postQuery.get(justPostedId).then((post) => {
        setJustPostedPost([post, ...justPostedPost]);
        setJustPostedId(``);
      });
    }
  }, [justPostedId]);

  //Post Delete

  useEffect(() => {
    if (postDeleteId !== ``) {
      postQuery.get(postDeleteId).then((post) => {
        post.destroy();

        const index = justPostedPost.findIndex((post: any) => {
          if (post.id === postDeleteId) {
            return true;
          }
        });
        justPostedPost.splice(index, 1);
        setPostDeleteId(``);
      });
    }
  }, [postDeleteId]);

  //Pushing state

  const postedPostInfo = (id: string) => {
    setJustPostedId(id);
  };

  const handlePostDelete = (id: string) => {
    setPostDeleteId(id);
  };

  //Post Query

  const postsQuery = () => {
    postQuery
      .descending(`createdAt`)
      .find()
      .then((posts) => setFeedPosts(posts))
      .then(() => setLoader(false));
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
              handlePostDelete={handlePostDelete}
            />
          ))}
        {feedPosts?.map((item: any, i: number) => (
          <Post
            key={i}
            postId={item.id}
            timestamp={item.attributes.createdAt}
            text={item.attributes.text}
            media={item.attributes.media && item.attributes.media._url}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
