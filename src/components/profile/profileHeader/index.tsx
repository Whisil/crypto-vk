import classNames from 'classnames';
import AccentBtn from '@/components/unknown/accentBtn';
import DmIcon from '@/public/images/icons/messages.svg';
import SettingsBtn from '@/public/images/icons/settings.svg';
import ProfileCounter from '../profileCounter';
import RippleBtn from '@/components/unknown/rippleBtn';
import { walletCut } from '@/utils/walletCut';
import Link from 'next/link';
import LinkIcon from '@/public/images/icons/link.svg';
import { IUser } from '@/types/user';

import styles from './styles.module.scss';
import { useAppSelector } from '@/app/hooks';

interface ProfileHeaderProps {
  isCurrentUser: boolean;
  userInfo: IUser;
}

const ProfileHeader = ({ isCurrentUser, userInfo }: ProfileHeaderProps) => {
  const { token } = useAppSelector((state) => state.user);

  const handleFollow = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/createFollow/${userInfo.ethAddress}`,
      {
        method: `POST`,
        headers: { Authorization: `Bearer ${token}` },
      },
    ).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={styles.header}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${
            userInfo.bannerURL
              ? userInfo.bannerURL
              : `/images/banner-placeholder.webp`
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
                  userInfo.avatarURL ? userInfo.avatarURL : `/images/clown.png`
                })`,
              }}
            />

            <div>
              <h2 className={styles.name}>{userInfo.displayName}</h2>
              <div className={styles.infoTags}>
                <span className={styles.tag}>@{userInfo.username}</span>
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(userInfo.ethAddress)
                  }
                  className={classNames(styles.tag, styles.walletAdress)}
                >
                  {walletCut(userInfo.ethAddress)}
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
              <AccentBtn
                text="Follow"
                className={styles.followBtn}
                containerClassName={styles.followeBtnContainer}
                onClick={handleFollow}
              />
            </div>
          )}
        </div>

        <div className={styles.middle}>
          {userInfo.websiteURL && (
            <a
              className={styles.website}
              href={userInfo.websiteURL ? userInfo.websiteURL : ``}
              target="_blank"
              rel="noreferrer"
            >
              {userInfo.websiteURL ? (
                <>
                  <LinkIcon /> {userInfo.websiteURL.split(`/`)[2]}
                </>
              ) : null}
            </a>
          )}
          {userInfo.bio ? (
            <span className={styles.bio}>{userInfo.bio}</span>
          ) : null}
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
