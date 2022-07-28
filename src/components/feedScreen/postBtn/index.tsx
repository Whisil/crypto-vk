import classNames from 'classnames';
import LikeIcon from 'public/images/icons/like.svg';
import CommentIcon from 'public/images/icons/comments.svg';
import ShareIcon from 'public/images/icons/share.svg';
import BuyIcon from 'public/images/icons/buy.svg';

import styles from './styles.module.scss';
import RippleBtn from '@/components/unknown/rippleBtn';

interface Props {
  variant: 'comment' | 'like' | 'share' | 'buy';
  bgTransparent?: boolean;
  liked?: boolean;
  onClick?: any;
}

const PostBtn = ({ variant, bgTransparent, liked = false, onClick }: Props) => {
  return (
    <RippleBtn
      className={classNames(
        styles.btn,
        liked && styles.liked,
        bgTransparent && styles.btnTransparent,
      )}
    >
      <div className={styles.btnInner} onClick={onClick}>
        {variant === `like` ? (
          <>
            <LikeIcon />
            <span className={styles.label}>Like</span>
          </>
        ) : variant === `comment` ? (
          <>
            <CommentIcon />
            <span className={styles.label}>Comment</span>
          </>
        ) : variant === `share` ? (
          <ShareIcon />
        ) : variant === `buy` ? (
          <BuyIcon />
        ) : null}
      </div>
    </RippleBtn>
  );
};

export default PostBtn;
