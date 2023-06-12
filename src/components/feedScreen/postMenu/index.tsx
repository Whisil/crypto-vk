import { useState, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import MenuBtn from '@/components/unknown/menuBtn';
import DotsIcon from 'public/images/icons/dots.svg';

import styles from './styles.module.scss';
import { IUser } from '@/types/user';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deletePost } from '@/features/postsSlice';
import {
  addSavedPost,
  deleteUserPost,
  removeSavedPost,
} from '@/features/userSlice';
import { deleteComment } from '@/features/commentsSlice';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface Props {
  createdBy?: IUser;
  id?: string;
  isComment?: boolean;
}

const PostMenu = ({ createdBy, id, isComment }: Props) => {
  const { user, token } = useAppSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handlePostDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/delete/${id}`, {
        method: `DELETE`,
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deletePost(id));
      dispatch(deleteUserPost(id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/delete/${id}`, {
        method: `DELETE`,
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(deleteComment(id));
      //TODO make deletion in post and user
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePostLogic = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${
        isSaved ? `unsave` : `save`
      }/${id}`,
      {
        method: `POST`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        if (isSaved) {
          dispatch(removeSavedPost(id));
          setIsSaved(false);
        } else {
          dispatch(addSavedPost(id));
          setIsSaved(true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useOutsideClick(menuRef, () => setShowMenu(false));

  useLayoutEffect(() => {
    if (user.savedPosts.includes(id as string)) {
      setIsSaved(true);
    }
  }, [id]); //eslint-disable-line

  return (
    <div
      className={classNames(styles.postMenu, isComment && styles.commentMenu)}
      ref={menuRef}
    >
      <span
        className={classNames(styles.dots, showMenu && styles.activeDots)}
        onClick={() => {
          setShowMenu(!showMenu);
          setMenuMounted(!setMenuMounted);
        }}
      >
        <DotsIcon />
      </span>

      {showMenu && (
        <div
          className={styles.menuList}
          onAnimationEnd={() => {
            if (menuMounted) setShowMenu(false);
          }}
        >
          {createdBy?.ethAddress === user.ethAddress ? (
            <MenuBtn
              icon="bin"
              text="Delete"
              accent
              onClick={() => {
                isComment ? handleCommentDelete() : handlePostDelete();
                setShowMenu(false);
              }}
            />
          ) : isComment ? (
            <MenuBtn icon="report" text="Report" accent />
          ) : (
            <>
              <MenuBtn
                icon="save"
                text={isSaved ? `Unsave` : `Save`}
                onClick={handleSavePostLogic}
              />
              <MenuBtn icon="notifications" text="Turn on notifications" />

              <span className={styles.divider} />

              <MenuBtn icon="unfollow" text="Unfollow" />

              <span className={styles.divider} />

              <MenuBtn icon="report" text="Report" accent />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenu;
