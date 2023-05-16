import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Post from '@/components/feedScreen/post';
import { IPost } from '@/types/post';
import Loader from '@/components/unknown/loader';

import GoBackIcon from '@/public/images/icons/go-back.svg';

import styles from './styles.module.scss';
import PostInput from '../feedScreen/postInput';
import { setComments } from '@/features/commentsSlice';
import NoContent from '../unknown/noContent';

const PostScreen = () => {
  const [mainLoader, setMainLoader] = useState(true);
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState<IPost>();

  const { token } = useAppSelector((state) => state.user);
  const { comments } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const fetchEntity = useCallback(
    async (url: string) => {
      try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL + url}`, {
          method: `GET`,
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());
      } catch (err) {
        console.log(err);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchEntity(`/post/${router.query.postId}`).then((res) => {
      setPost(res);
      setMainLoader(false);
    });
    fetchEntity(`/comment/${router.query.postId}`).then((res) => {
      dispatch(setComments(res));
      setLoader(false);
    });
  }, [fetchEntity, router.query.postId, dispatch]);

  return (
    <div>
      <button className={styles.goBackBtn} onClick={() => router.back()}>
        <GoBackIcon />
        <span className={styles.goBackBtnText}>Go Back</span>
      </button>

      {mainLoader ? (
        <Loader />
      ) : !post ? (
        `there's nothing here`
      ) : (
        <>
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
          <PostInput commentInput commentOnPostId={post._id} />
          {loader ? (
            <Loader />
          ) : comments?.length == 0 ? (
            <NoContent text="No comments here yet" />
          ) : (
            comments?.map((item) => (
              <Post
                isComment
                key={item._id}
                _id={item._id}
                createdAt={item.createdAt}
                text={item.text}
                mediaURL={item.mediaURL && item.mediaURL}
                createdBy={item.createdBy}
                likes={item.likes}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default PostScreen;
