import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import DotsIcon from 'public/images/icons/dots.svg';
import SaveIcon from 'public/images/icons/save.svg';
import NotificationsIcon from 'public/images/icons/notifications-icon.svg';
import UnfollowIcon from 'public/images/icons/unfollow.svg';
import ReportIcon from 'public/images/icons/report.svg';
import Like from 'public/images/icons/like.svg';
import image from './test.jpg';

import styles from './styles.module.scss';
import RippleBtn from '@/components/unknown/rippleBtn';

const Post = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showMenu]);

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo timestamp="10 minutes ago" />
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
              <RippleBtn>
                <div className={styles.menuItem}>
                  <SaveIcon />
                  <span>Save</span>
                </div>
              </RippleBtn>

              <RippleBtn>
                <div className={styles.menuItem}>
                  <NotificationsIcon />
                  <span>Turn on notifications</span>
                </div>
              </RippleBtn>

              <span className={styles.divider} />

              <RippleBtn>
                <div className={styles.menuItem}>
                  <UnfollowIcon />
                  <span>Unfollow</span>
                </div>
              </RippleBtn>

              <span className={styles.divider} />

              <RippleBtn>
                <div className={classNames(styles.menuItem, styles.report)}>
                  <ReportIcon />
                  <span>Report</span>
                </div>
              </RippleBtn>
            </div>
          )}
        </div>
      </div>

      <p className={styles.description}>
        Let’s do something cool, developing a new social media with NFTs as a
        core part sounds amazing doesn’t it?
      </p>

      <div className={styles.media}>
        <Image
          className={styles.mediaContent}
          src={image}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.likes}>
          <Like />
          <span className={styles.likesCount}>134 Likes</span>
        </div>

        <div className={styles.comments}>45 comments</div>
      </div>

      <div className={styles.interactions}>
        <PostBtn variant="like" />
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>
    </div>
  );
};

export default Post;
