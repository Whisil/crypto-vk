import { useMemo, useState } from 'react';
import Post from '@/components/feedScreen/post';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const ProfileFeed = ({ variant = `` }: { variant?: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postDeleteId, setPostDeleteId] = useState<string>(``);

  const { Moralis, user } = useMoralis();

  const postQuery = useMemo(() => new Moralis.Query(`Posts`), [Moralis.Query]);

  useEffect(() => {
    if (variant.length === 0) {
      // setPosts([]);
      user?.attributes.posts
        .query()
        .find()
        .then((fetchedPosts: object[]) => setPosts(fetchedPosts));
    } else if (variant === `media`) {
      // setPosts([]);
      user?.attributes.posts
        .query()
        .notEqualTo(`media`, undefined)
        .find()
        .then((fetchedPosts: object[]) => setPosts(fetchedPosts));
    }
  }, [variant, user?.attributes.posts]);

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
  }, [postDeleteId, Moralis.Object, postQuery]);

  const handlePostDelete = (id: string) => {
    setPostDeleteId(id);
  };

  return (
    <div>
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
    </div>
  );
};

export default ProfileFeed;
