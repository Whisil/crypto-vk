import classNames from 'classnames';
import AccentBtn from '@/components/unknown/accentBtn';
import DmIcon from '@/public/images/icons/messages.svg';
import SettingsBtn from '@/public/images/icons/settings.svg';
import ProfileCounter from '../profileCounter';
import RippleBtn from '@/components/unknown/rippleBtn';
import { walletCut } from '@/utils/walletCut';
import Link from 'next/link';
import { useAppSelector } from '@/app/hooks';
import LinkIcon from '@/public/images/icons/link.svg';

import styles from './styles.module.scss';

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
  const { bannerURL, avatarURL, bio, websiteURL } = useAppSelector(
    (state) => state.user.user,
  );

  return (
    <div className={styles.header}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${
            bannerURL ? bannerURL : `/images/banner-placeholder.webp`
          })`,
        }}
      />
      <div className={styles.headerContent}>
        <div className={styles.upper}>
          <div className={styles.upperAvatarSide}>
            <div
              className={styles.avatar}
              style={{
                backgroundImage: `url(${
                  avatarURL ? avatarURL : `/images/clown.png`
                })`,
              }}
            />

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
              <Link href={`/settings`} passHref>
                <a className={styles.upperSettingsBtn}>
                  <SettingsBtn />
                  <span>Edit</span>
                </a>
              </Link>
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
          {websiteURL && (
            <a
              className={styles.website}
              href={websiteURL}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon />
              {websiteURL.split(`/`)[2]}
            </a>
          )}
          {bio && <span className={styles.bio}>{bio}</span>}
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
