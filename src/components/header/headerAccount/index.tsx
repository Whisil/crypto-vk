import AccountImage from '@/components/unknown/accountImage';
import Triangle from 'public/images/icons/triangle.svg';
import DarkModeIcon from 'public/images/icons/darkmode-switch.svg';
import HelpIcon from 'public/images/icons/help.svg';
import SettingsIcon from 'public/images/icons/settings.svg';
import LogoutIcon from 'public/images/icons/log-out.svg';

import styles from './styles.module.scss';
import classNames from 'classnames';
import Switch from '@/components/unknown/switch';
import { useEffect, useRef, useState } from 'react';

const HeaderAccount = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    window.addEventListener('click', handleOutsideClick);
    
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showMenu]);

  return (
    <div className={styles.headerAccount}>
      <div
        className={styles.headerAccountBtn}
        onClick={() => setShowMenu(!showMenu)}
      >
        <AccountImage />
        <span className={styles.name}>David</span>
        <Triangle />
      </div>

      {showMenu && (
        <div className={styles.headerAccountMenu} ref={menuRef}>
          <div className={styles.AccountMenuItem}>
            <AccountImage />
            <span>David Haidamaka</span>
          </div>

          <span className={styles.divider} />

          <div
            className={classNames(styles.AccountMenuItem, styles.modeSwitch)}
          >
            <DarkModeIcon />
            <span>Dark mode</span>
            <Switch variant="theme-switch" />
          </div>

          <span className={styles.divider} />

          <div className={styles.AccountMenuItem}>
            <HelpIcon />
            <span>About & Help</span>
          </div>
          <div className={styles.AccountMenuItem}>
            <SettingsIcon />
            <span>Settings</span>
          </div>

          <span className={styles.divider} />

          <div className={classNames(styles.AccountMenuItem, styles.logout)}>
            <LogoutIcon />
            <span>Log out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderAccount;
