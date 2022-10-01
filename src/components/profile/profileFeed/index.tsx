import { useMemo, useState } from 'react';
import Post from '@/components/feedScreen/post';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Loader from '@/components/unknown/loader';

import styles from './styles.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProfileFeed = ({
  variant = ``,
}: {
  variant?: string | string[] | undefined;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postDeleteId, setPostDeleteId] = useState<string>(``);
  const [loader, setLoader] = useState<boolean>(true);

  const { Moralis } = useMoralis();

  const postQuery = useMemo(() => new Moralis.Query(`Posts`), [Moralis.Query]);

  const router = useRouter();

  useEffect(() => {
    if (variant.length === 0) {
      Moralis.Cloud.run(`userFetch`, { id: router.query.profileId }).then(
        (fetchedUser) => {
          fetchedUser[0]?.attributes.posts
            .query()
            .find()
            .then((fetchedPosts: object[]) => {
              setPosts(fetchedPosts);
              setLoader(false);
            });
        },
      );
    } else if (variant === `media`) {
      Moralis.Cloud.run(`userFetch`, { id: router.query.profileId }).then(
        (fetchedUser) => {
          fetchedUser[0]?.attributes.posts
            .query()
            .notEqualTo(`media`, null)
            .find()
            .then((fetchedPosts: object[]) => {
              setPosts(fetchedPosts);
              setLoader(false);
            });
        },
      );
    }
  }, [variant, Moralis.Cloud, router.query.profileId]);

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
    <>
      {loader ? (
        <div className={styles.loaderWrapper}>
          <Loader variant="small" />
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className={styles.noPostsIllu}>
              <Image
                src="/images/no-posts.svg"
                layout="fixed"
                width={395}
                height={245}
                alt="no posts"
              />
            </div>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default ProfileFeed;
