import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import IconImport from '@/components/unknown/IconImport';
import LinkRippleBtn from '@/components/unknown/linkRippleBtn';
import MenuNftCard from '../menuNftCard';

import styles from './styles.module.scss';

const ProfileMenu = () => {
  const menu = [
    {
      title: `Posts`,
      query: undefined,
      iconName: `profile-posts`,
    },
    {
      title: `Media`,
      query: `media`,
      iconName: `profile-image-media`,
    },
    {
      title: `NFTs`,
      query: `nfts`,
      iconName: `profile-diamond`,
    },
  ];

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menuUpper}>
          {menu.map((item) => (
            <Link
              href={item.query ? { query: { tab: item.query } } : `/profile`}
              key={item.title}
            >
              <a
                className={classNames(
                  styles.link,
                  router.query.tab === item.query && styles.activeLink,
                )}
              >
                <div className={styles.menuItem}>
                  <IconImport icon={item.iconName} />
                  <span className={styles.title}>{item.title}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        <div className={styles.menuBottom}>
          <div className={styles.header}>
            <IconImport icon={`profile-tag`} />
            <span className={styles.headerText}>For Sale</span>
          </div>

          <div className={styles.cards}>
            <MenuNftCard image="/images/nft-card.webp" price={125.5} />
            <MenuNftCard image="/images/nft-card.webp" price={125.5} />
            <MenuNftCard image="/images/nft-card.webp" price={125.5} />
            <MenuNftCard image="/images/nft-card.webp" price={125.5} />
          </div>
        </div>

        <LinkRippleBtn text="Marketplace" link="/" />
      </div>
    </div>
  );
};

export default ProfileMenu;
