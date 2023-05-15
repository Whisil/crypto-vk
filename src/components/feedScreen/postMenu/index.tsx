import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import MenuBtn from '@/components/unknown/menuBtn';
import DotsIcon from 'public/images/icons/dots.svg';

import styles from './styles.module.scss';
import { IUser } from '@/types/user';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deletePost } from '@/features/postsSlice';
import { deleteUserPost } from '@/features/userSlice';
import { deleteComment } from '@/features/commentsSlice';

interface Props {
  createdBy?: IUser;
  id?: string;
  isComment?: boolean;
}

const PostMenu = ({ createdBy, id, isComment }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, token } = useAppSelector((state) => state.user);
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
      //TODO make deletion in user and post
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: Event) {
      if (menuRef.current && !menuRef.current.contains(e.target as Document)) {
        setShowMenu(false);
      }
    }
    window.addEventListener(`click`, handleOutsideClick);

    return () => window.removeEventListener(`click`, handleOutsideClick);
  }, [showMenu]);

  return (
    <div
      className={classNames(styles.postMenu, isComment && styles.commentMenu)}
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
          ref={menuRef}
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
              <MenuBtn icon="save" text="Save" />
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
