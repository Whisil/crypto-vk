import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from 'react-moralis';
import Image from 'next/image';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import DotsIcon from 'public/images/icons/dots.svg';
import SaveIcon from 'public/images/icons/save.svg';
import NotificationsIcon from 'public/images/icons/notifications-icon.svg';
import UnfollowIcon from 'public/images/icons/unfollow.svg';
import ReportIcon from 'public/images/icons/report.svg';
import Like from 'public/images/icons/like.svg';

import styles from './styles.module.scss';
import RippleBtn from '@/components/unknown/rippleBtn';

interface Props {
  postId: string;
  timestamp: any;
  text?: string;
  media?: string;
}

const Post = ({ postId, timestamp, text, media }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<any[]>();

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

  //User fetching

  const { fetch } = useMoralisQuery(`_User`, (query) =>
    query.include(`posts`, postId),
  );

  const userQuery = async () => {
    const result = await fetch();
    setUserInfo(result);
  };

  useEffect(() => {
    userQuery();
  }, []);

  // Likes
  const { Moralis, user } = useMoralis();

  const handleLike = async () => {
    const Like = Moralis.Object.extend(`Likes`);

    const newLike = new Like();
    newLike.save().then(() => {
      const postQuery = new Moralis.Query(`Posts`);

      postQuery.get(postId).then((post) => {
        post.relation(`likes`).add(newLike);
        newLike.relation(`likedBy`).add(user);
        newLike.relation(`likedPost`).add(post);
        user?.relation(`likes`).add(newLike);
        user?.save();
        newLike.save();
        post.save();
      });
    });
  };

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo
          timestamp={timestamp}
          displayName={userInfo && userInfo[0]?.attributes.displayName}
          separateLink
        />
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

      {text && <p className={styles.description}>{text}</p>}

      {media && (
        <div className={styles.media}>
          <Image
            className={styles.mediaContent}
            src={media}
            layout="fill"
            objectFit="contain"
            alt="post media"
          />
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.likes}>
          <Like />
          <span className={styles.likesCount}>134 Likes</span>
        </div>

        <div className={styles.comments}>45 comments</div>
      </div>

      <div className={styles.interactions}>
        <div onClick={handleLike} className={styles.btnWrapper}>
          <PostBtn variant="like" />
        </div>
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>
    </div>
  );
};

export default Post;
