import { useState } from 'react';
import Post from '@/components/feedScreen/post';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const ProfileFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postDeleteId, setPostDeleteId] = useState<string>(``);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

  useEffect(() => {
    user?.attributes.posts
      .query()
      .find()
      .then((fetchedPosts: object[]) => setPosts(fetchedPosts));
  }, []);

  useEffect(() => {
    if (postDeleteId !== ``) {
      postQuery.get(postDeleteId).then(async (post) => {
        await post.attributes.likes
          .query()
          .find()
          .then((res: any[]) => Moralis.Object.destroyAll(res));
        await post.attributes.comments
          .query()
          .find()
          .then((res: any[]) => Moralis.Object.destroyAll(res));
        post.destroy();

        setPosts((feedPosts) =>
          feedPosts.filter((post) => post.id !== postDeleteId),
        );

        setPostDeleteId(``);
      });
    }
  }, [postDeleteId]);

  const handlePostDelete = (id: string) => {
    setPostDeleteId(id);
  };

  return (
    <>
      {posts.map((item) => (
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
    </>
  );
};

export default ProfileFeed;
