import classNames from 'classnames';
import { useRouter } from 'next/router';
import Search from '../search';
import NavBtn from '../navBtn';
import Logo from 'public/images/icons/logo.svg';

import styles from './styles.module.scss';
import Link from 'next/link';
import HeaderAccount from '../headerAccount';

const HeaderWrapper = () => {
  const router = useRouter();

  const menu = [
    { title: `Home`, path: `/`, iconName: `home` },
    { title: `Explore`, path: `/explore`, iconName: `explore` },
    { title: `Messages`, path: `/messages`, iconName: `messages` },
    { title: `Market`, path: `/market`, iconName: `market` },
  ];

  return (
    <header>
      <div className={classNames(styles.headerContainer, `container`)}>
        <div className={styles.logoSide}>
          <Link href="/">
            <a>
              <span className={styles.logo}>
                <Logo />
              </span>
            </a>
          </Link>

          <Search />
        </div>

        <div className={styles.navSide}>
          {menu.map((item) => (
            <Link href={item.path} key={item.title}>
              <a className={router.pathname === item.path ? `` : styles.link}>
                <NavBtn
                  text={item.title}
                  icon={item.iconName}
                  active={router.pathname === item.path ? true : false}
                />
              </a>
            </Link>
          ))}
          <div className={styles.notifications}>
            <NavBtn icon="notifications" active={false} />
          </div>

          <span className={styles.divider} />

          <HeaderAccount />
        </div>
      </div>
    </header>
  );
};

export default HeaderWrapper;
