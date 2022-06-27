import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import AccountInfo from '@/components/unknown/accountInfo';
import DotsIcon from 'public/images/icons/dots.svg';
import SaveIcon from 'public/images/icons/save.svg';
import NotificationsIcon from 'public/images/icons/notifications-icon.svg';
import UnfollowIcon from 'public/images/icons/unfollow.svg';
import ReportIcon from 'public/images/icons/report.svg';

import styles from './styles.module.scss';

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
              <div className={styles.menuItem}>
                <SaveIcon />
                <span>Save</span>
              </div>

              <div className={styles.menuItem}>
                <NotificationsIcon />
                <span>Turn on notifications</span>
              </div>

              <span className={styles.divider} />

              <div className={styles.menuItem}>
                <UnfollowIcon />
                <span>Unfollow</span>
              </div>

              <span className={styles.divider} />

              <div className={classNames(styles.menuItem, styles.report)}>
                <ReportIcon />
                <span>Report</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.description}></div>

      <div className={styles.media}></div>

      <div className={styles.info}></div>

      <div className={styles.interactions}></div>
    </div>
  );
};

export default Post;
