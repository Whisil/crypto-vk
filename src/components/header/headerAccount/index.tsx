import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AccountImage from '@/components/unknown/accountImage';
import Triangle from 'public/images/icons/triangle.svg';
import AvatarIcon from 'public/images/icons/avatar.svg';
import DarkModeIcon from 'public/images/icons/darkmode-switch.svg';
import HelpIcon from 'public/images/icons/help.svg';
import SettingsIcon from 'public/images/icons/settings.svg';
import LogoutIcon from 'public/images/icons/log-out.svg';
import Link from 'next/link';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Switch from '@/components/unknown/switch';
import RippleBtn from '@/components/unknown/rippleBtn';

const HeaderAccount = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { logout, user } = useMoralis();

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

  async function handleLogout() {
    await logout();
  }

  return (
    <div className={styles.headerAccount}>
      <div
        className={styles.headerAccountBtn}
        onClick={() => setShowMenu(!showMenu)}
      >
        <AccountImage />
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{user?.attributes.displayName}</span>
        </div>
        <Triangle />
      </div>

      {showMenu && (
        <div className={styles.headerAccountMenu} ref={menuRef}>
          <RippleBtn>
            <div className={styles.AccountMenuItem}>
              <AvatarIcon />
              <Link href="#" passHref>
                <span>
                  <a>
                    Profile  
                  </a>  
                </span>
              </Link>
            </div>
          </RippleBtn>

          <span className={styles.divider} />

          <div
            className={classNames(styles.AccountMenuItem, styles.modeSwitch)}
          >
            <DarkModeIcon />
            <span>Dark mode</span>
            <Switch variant="theme-switch" />
          </div>

          <span className={styles.divider} />

          <RippleBtn>
            <div className={styles.AccountMenuItem}>
              <HelpIcon />
              <span>About & Help</span>
            </div>
          </RippleBtn>
          <RippleBtn>
            <div className={styles.AccountMenuItem}>
              <SettingsIcon />
              <span>Settings</span>
            </div>
          </RippleBtn>

          <span className={styles.divider} />

          <RippleBtn>
            <div
              className={classNames(styles.AccountMenuItem, styles.logout)}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Log out</span>
            </div>
          </RippleBtn>
        </div>
      )}
    </div>
  );
};

export default HeaderAccount;
