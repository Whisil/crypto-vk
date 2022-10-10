import classNames from 'classnames';
import AccentBtn from '@/components/unknown/accentBtn';
import DmIcon from '@/public/images/icons/messages.svg';
import ProfileCounter from '../profileCounter';
import { useMoralis } from 'react-moralis';

import styles from './styles.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  ethAddress: string;
}

const ProfileHeader = ({
  displayName,
  username,
  ethAddress,
}: ProfileHeaderProps) => {
  const { user } = useMoralis();
  const router = useRouter();

  const [isCurrentUser] = useState<boolean>(
    user?.id === router.query.profileId,
  );

  return (
    <div className={styles.header}>
      <div className={styles.banner} />
      <div className={styles.headerContent}>
        <div className={styles.upper}>
          <div className={styles.upperAvatarSide}>
            <div className={styles.avatar} />

            <div>
              <h2 className={styles.name}>{displayName}</h2>
              <div className={styles.infoTags}>
                <span className={styles.tag}>@{username}</span>
                <span
                  onClick={() => navigator.clipboard.writeText(ethAddress)}
                  className={classNames(styles.tag, styles.walletAdress)}
                >{`${ethAddress.slice(0, 5)}...${ethAddress.slice(
                  ethAddress.length - 10,
                  -5,
                )}`}</span>
              </div>
            </div>
          </div>
          {isCurrentUser ? (
            <></>
          ) : (
            <div className={styles.upperBtns}>
              <div className={styles.dmBtn}>
                <DmIcon />
              </div>
              <AccentBtn text="Follow" className={styles.followBtn} />
            </div>
          )}
        </div>

        <div className={styles.middle}>
          <span className={styles.bio}>
            This is my bio, it’s optional but I still decided to include it, so
            enjoy This is my bio, it’s optional but I still decided to include
            it, so enjoy This is my bio, it’s optional but I still decided to
            include it, so enjoy
          </span>
        </div>

        <div className={styles.bottom}>
          <ProfileCounter number={533} title="Posts" />
          <ProfileCounter number={533} title="Followers" />
          <ProfileCounter number={533} title="NFTs" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
