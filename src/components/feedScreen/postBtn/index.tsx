import classNames from 'classnames';
import LikeIcon from 'public/images/icons/like.svg';
import CommentIcon from 'public/images/icons/comments.svg';
import ShareIcon from 'public/images/icons/share.svg';

import styles from './styles.module.scss';
import RippleBtn from '@/components/unknown/rippleBtn';

interface Props {
  variant: 'comment' | 'like' | 'share' | 'reply';
  bgTransparent?: boolean;
  liked?: boolean;
  onClick?(): void;
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
        ) : variant === `comment` || variant === `reply` ? (
          <>
            <CommentIcon />
            <span className={styles.label}>
              {variant === `reply` ? `Reply` : `Comment`}
            </span>
          </>
        ) : variant === `share` ? (
          <ShareIcon />
        ) : null}
      </div>
    </RippleBtn>
  );
};

export default PostBtn;
