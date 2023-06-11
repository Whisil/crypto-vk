import AccentBtn from '@/components/unknown/accentBtn';
import AccountInfo from '@/components/unknown/accountInfo';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/app/hooks';
import classNames from 'classnames';

interface FollowSuggestionProps {
  username: string;
  avatarURL: string;
  ethAddress: string;
  displayName: string;
}

const FollowSuggestion = ({
  username,
  avatarURL,
  ethAddress,
  displayName,
}: FollowSuggestionProps) => {
  const [isUserFollowed, setIsUserFollowed] = useState(false);

  const { token } = useAppSelector((state) => state.user);

  const handleFollow = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${
        !isUserFollowed ? `createFollow` : `removeFollow`
      }/${ethAddress}`,
      {
        method: `POST`,
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then(() => setIsUserFollowed((prevState) => !prevState))
      .catch((err) => {
        console.log(err);
      });
  }, [ethAddress, token]); //eslint-disable-line

  return (
    <Link href="/">
      <a className={styles.item}>
        <AccountInfo
          username={username}
          displayName={displayName}
          className={styles.infoResponsive}
          image={avatarURL}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className={styles.followBtn}
        >
          <AccentBtn
            text={isUserFollowed ? `Unfollow` : `Follow`}
            onClick={handleFollow}
            className={classNames(
              styles.followBtn,
              isUserFollowed && styles.isFollowedBtn,
            )}
            containerClassName={styles.followedBtnContainer}
          />
        </div>
      </a>
    </Link>
  );
};

export default FollowSuggestion;
