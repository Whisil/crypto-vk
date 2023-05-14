import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import Post from '@/components/feedScreen/post';
import { IPost } from '@/types/post';
import Loader from '@/components/unknown/loader';

import GoBackIcon from '@/public/images/icons/go-back.svg';

import styles from './styles.module.scss';
import PostInput from '../feedScreen/postInput';
import { IComment } from '@/types/comment';

const PostScreen = () => {
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>();

  const { token } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.posts);

  const router = useRouter();

  // const fetchPost = useCallback(async () => {
  //   await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/post/${router.query.postId}`,
  //     {
  //       method: `GET`,
  //       headers: { Authorization: `Bearer ${token}` },
  //     },
  //   )
  //     .then((res) => res.json())
  //     .then((resPost) => {
  //       setPost(resPost);
  //     })
  //     .catch((err) => console.log(err));
  //   setLoader(false);
  // }, [token]); // eslint-disable-line

  const fetchComments = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/${router.query.postId}`,
      {
        method: `GET`,
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((resComment) => {
        setComments(resComment);
        setLoader(false);
      })
      .catch((err) => console.log(err));
    // setLoader(false);
  }, [token, router.query.postId]);

  useEffect(() => {
    const currPost = posts.find((item) => item._id === router.query.postId);
    setPost(currPost);
    fetchComments();
  }, [router.query.postId, posts]);

  return (
    <div>
      <button className={styles.goBackBtn} onClick={() => router.back()}>
        <GoBackIcon />
        <span className={styles.goBackBtnText}>Go Back</span>
      </button>

      {!post ? (
        `there's nothing here`
      ) : (
        <Post
          key={post._id}
          _id={post._id}
          createdAt={post.createdAt}
          text={post.text}
          mediaURL={post.mediaURL && post.mediaURL}
          createdBy={post.createdBy}
          comments={post.comments}
          likes={post.likes}
        />
      )}

      <PostInput commentInput />
    </div>
  );
};

export default PostScreen;
