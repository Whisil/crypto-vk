import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useMoralis } from 'react-moralis';
import Image from 'next/image';
import AccountInfo from '@/components/unknown/accountInfo';
import PostBtn from '../postBtn';
import DotsIcon from 'public/images/icons/dots.svg';
import Like from 'public/images/icons/like.svg';
import MenuBtn from '@/components/unknown/menuBtn';

import styles from './styles.module.scss';

interface Props {
  postId: string;
  timestamp: any;
  text?: string;
  media?: string;
  likeCount: number;
  handlePostDelete?: any;
}

const Post = ({
  postId,
  timestamp,
  text,
  media,
  likeCount,
  handlePostDelete,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [likeId, setLikeId] = useState<string>(``);

  const menuRef = useRef<HTMLDivElement>(null);

  const { Moralis, user } = useMoralis();

  const postQuery = new Moralis.Query(`Posts`);

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

  useEffect(() => {
    const query = new Moralis.Query(`Posts`);
    query.get(postId).then(function (result: any) {
      result
        .relation(`createdBy`)
        .query()
        .find()
        .then((res: any) => setUserInfo(res[0]));
    });
  }, []);

  // Likes

  const handleLike = async () => {
    const Like = Moralis.Object.extend(`Likes`);

    const newLike = new Like();
    newLike.save().then(() => {
      postQuery.get(postId).then((post) => {
        post.relation(`likes`).add(newLike);
        post.increment(`likeCount`);
        setLikeId(newLike.id);
        newLike.relation(`likedBy`).add(user);
        newLike.relation(`likedPost`).add(post);
        user?.relation(`likes`).add(newLike);
        user?.save();
        newLike.save();
        post.save();
      });
    });
  };

  const handleLikeRemove = async () => {
    const likeQuery = new Moralis.Query(`Likes`);
    (await likeQuery.get(likeId)).destroy().then(() => setLikeId(``));

    const postQuery = new Moralis.Query(`Posts`);
    postQuery.get(postId).then((post) => {
      post.decrement(`likeCount`);
      post.save();
    });
  };

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <AccountInfo
          timestamp={timestamp}
          displayName={userInfo && userInfo.attributes.displayName}
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
              {userInfo.id === user?.id ? (
                <MenuBtn
                  icon="bin"
                  text="Delete"
                  accent
                  onClick={() => handlePostDelete(postId)}
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
      </div>

      {text && <span className={styles.description}>{text}</span>}

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
          <span className={styles.likesCount}>
            {likeId !== `` ? likeCount + 1 : likeCount} Likes
          </span>
        </div>

        <div className={styles.comments}>45 comments</div>
      </div>

      <div className={styles.comments}></div>

      <div className={styles.interactions}>
        <div
          onClick={likeId === `` ? handleLike : handleLikeRemove}
          className={styles.btnWrapper}
        >
          <PostBtn variant="like" liked={likeId !== `` && true} />
        </div>
        <PostBtn variant="comment" />
        <PostBtn variant="share" bgTransparent />
      </div>
    </div>
  );
};

export default Post;
