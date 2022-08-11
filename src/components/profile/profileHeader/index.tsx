import { useMoralis } from 'react-moralis';
import classNames from 'classnames';
import AccentBtn from '@/components/unknown/accentBtn';
import DmIcon from '@/public/images/icons/messages.svg';
import ProfileCounter from '../profileCounter';

import styles from './styles.module.scss';

const ProfileHeader = () => {
  const { user } = useMoralis();

  return (
    <div className={styles.header}>
      <div className={styles.banner} />
      <div className={styles.headerContent}>
        <div className={styles.upper}>
          <div className={styles.upperAvatarSide}>
            <div className={styles.avatar} />

            <div>
              <h2 className={styles.name}>David Haidamaka</h2>
              <div className={styles.infoTags}>
                <span className={styles.tag}>@{user?.attributes.username}</span>
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(user?.attributes.ethAddress)
                  }
                  className={classNames(styles.tag, styles.walletAdress)}
                >{`${user?.attributes.ethAddress.slice(
                  0,
                  5,
                )}...${user?.attributes.ethAddress.slice(
                  user?.attributes.ethAddress.length - 10,
                  -5,
                )}`}</span>
              </div>
            </div>
          </div>
          <div className={styles.upperBtns}>
            <div className={styles.dmBtn}>
              <DmIcon />
            </div>
            <AccentBtn text="Follow" className={styles.followBtn} />
          </div>
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
