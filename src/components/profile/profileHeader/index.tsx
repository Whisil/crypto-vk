import classNames from 'classnames';
import AccentBtn from '@/components/unknown/accentBtn';
import DmIcon from '@/public/images/icons/messages.svg';
import SettingsBtn from '@/public/images/icons/settings.svg';
import ProfileCounter from '../profileCounter';

import styles from './styles.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import RippleBtn from '@/components/unknown/rippleBtn';
import { walletCut } from '@/utils/walletCut';

interface ProfileHeaderProps {
  displayName: string;
  username: string;
  ethAddress: string;
  isCurrentUser: boolean;
}

const ProfileHeader = ({
  displayName,
  username,
  ethAddress,
  isCurrentUser,
}: ProfileHeaderProps) => {
  const router = useRouter();

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
                >
                  {walletCut(ethAddress)}
                </span>
              </div>
            </div>
          </div>
          {isCurrentUser ? (
            <RippleBtn className={styles.settingsRipple}>
              <div className={styles.upperSettingsBtn}>
                <SettingsBtn />
                <span>Edit</span>
              </div>
            </RippleBtn>
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
