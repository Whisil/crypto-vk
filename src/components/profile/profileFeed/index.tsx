import { useCallback, useState } from 'react';
import Post from '@/components/feedScreen/post';
import { useEffect } from 'react';
import Loader from '@/components/unknown/loader';
import Image from 'next/image';
import { IPost } from '@/types/post';
import { useAppSelector } from '@/app/hooks';

import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const ProfileFeed = ({
  variant = ``,
}: {
  variant?: string | string[] | undefined;
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(posts);
  const { token } = useAppSelector((state) => state.user);

  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/user/${
      router.query.userWallet
    }/posts${variant === `media` ? `/media` : ``}`;

    await fetch(baseURL, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [token, variant, router.query.userWallet]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {isLoading ? (
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
                  key={item._id}
                  _id={item._id}
                  createdAt={item.createdAt}
                  text={item.text}
                  mediaURL={item.mediaURL && item.mediaURL}
                  createdBy={item.createdBy}
                  comments={item.comments}
                  likes={item.likes}
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
