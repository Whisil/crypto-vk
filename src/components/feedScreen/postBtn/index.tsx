import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import LikeIcon from 'public/images/icons/like.svg';
import CommentIcon from 'public/images/icons/comments.svg';
import ShareIcon from 'public/images/icons/share.svg';
import BuyIcon from 'public/images/icons/buy.svg';

import styles from './styles.module.scss';

interface Props {
  variant: 'comment' | 'like' | 'share' | 'buy';
  bgTransparent?: boolean;
}

const PostBtn = ({ variant, bgTransparent }: Props) => {

  const [clicked, setClicked] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const btnRef = useRef<HTMLDivElement>(null);

  const handleRipple = (e:any) => {
    setTop(e.clientY - e.target.getBoundingClientRect().top);
    setLeft(e.clientX - e.target.getBoundingClientRect().left);
    setClicked((val) => !val);
  };

  useEffect(() => {
    if (btnRef.current) {
      const bubble = document.createElement("div");
      bubble.classList.add(styles.bubble);
      bubble.style.top = top + "px";
      bubble.style.left = left + "px";
      btnRef.current.appendChild(bubble);
      setTimeout(() => {
        btnRef?.current?.removeChild(bubble);
      }, 401);
    }
  }, [clicked]);

  return (
    <div
      className={classNames(styles.btn, bgTransparent && styles.btnTransparent)}
      onClick={handleRipple}
      ref={btnRef}
    >
      {variant === 'like' ? (
        <>
          <LikeIcon />
          <span className={styles.label}>Like</span>
        </>
      ) : variant === 'comment' ? (
        <>
          <CommentIcon />
          <span className={styles.label}>Like</span>
        </>
      ) : variant === 'share' ? (
        <ShareIcon />
      ) : variant === 'buy' ? (
        <BuyIcon />
      ) : null}
    </div>
  );
};

export default PostBtn;
