import { useState, useEffect, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import classNames from 'classnames';
import MenuBtn from '@/components/unknown/menuBtn';
import DotsIcon from 'public/images/icons/dots.svg';

import styles from './styles.module.scss';

interface Props {
  userId?: any;
  handlePostDelete?(postId: string | undefined): void;
  postId?: string;
}

const PostMenu = ({ userId, handlePostDelete, postId }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  const { user } = useMoralis();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    window.addEventListener(`click`, handleOutsideClick);

    return () => window.removeEventListener(`click`, handleOutsideClick);
  }, [showMenu]);

  return (
    <div className={styles.postMenu}>
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
          {userId === user?.id ? (
            <MenuBtn
              icon="bin"
              text="Delete"
              accent
              onClick={() => handlePostDelete && handlePostDelete(postId)}
            />
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
