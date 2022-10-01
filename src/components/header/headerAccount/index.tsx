import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AccountImage from '@/components/unknown/accountImage';
import Triangle from 'public/images/icons/triangle.svg';
import DarkModeIcon from 'public/images/icons/darkmode-switch.svg';
import classNames from 'classnames';
import Switch from '@/components/unknown/switch';
import MenuBtn from '@/components/unknown/menuBtn';

import styles from './styles.module.scss';

const HeaderAccount = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { logout, user } = useMoralis();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: Event) {
      if (menuRef.current && !menuRef.current.contains(e.target as Document)) {
        setShowMenu(false);
      }
    }
    window.addEventListener(`click`, handleOutsideClick);

    return () => window.removeEventListener(`click`, handleOutsideClick);
  }, [showMenu]);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className={styles.headerAccount}>
      <div
        className={classNames(
          styles.headerAccountBtn,
          showMenu && styles.headerAccountBtnActive,
        )}
        onClick={() => setShowMenu(!showMenu)}
      >
        <AccountImage />
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{user?.attributes.displayName}</span>
        </div>
        <Triangle className={styles.triangle} />
      </div>

      {showMenu && (
        <div className={styles.headerAccountMenu} ref={menuRef}>
          <MenuBtn icon="avatar" text="Profile" link={`/${user?.id}`} />

          <span className={styles.divider} />

          <div
            className={classNames(styles.AccountMenuItem, styles.modeSwitch)}
          >
            <DarkModeIcon />
            <span>Dark mode</span>
            <Switch variant="theme-switch" />
          </div>

          <span className={styles.divider} />

          <MenuBtn icon="help" text="About & help" />
          <MenuBtn icon="settings" text="Settings" />

          <span className={styles.divider} />

          <MenuBtn
            icon="log-out"
            text="Log out"
            onClick={handleLogout}
            accent
          />
        </div>
      )}
    </div>
  );
};

export default HeaderAccount;
