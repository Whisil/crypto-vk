import { useEffect, useRef, useState } from 'react';
import AccountImage from '@/components/unknown/accountImage';
import Triangle from 'public/images/icons/triangle.svg';
import DarkModeIcon from 'public/images/icons/darkmode-switch.svg';
import classNames from 'classnames';
import Switch from '@/components/unknown/switch';
import MenuBtn from '@/components/unknown/menuBtn';
import { clearUser } from '@/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import styles from './styles.module.scss';

const HeaderAccount = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { disconnect } = useDisconnect();

  const router = useRouter();

  const handleWalletDisconnect = () => {
    disconnect();
    dispatch(clearUser());
  };

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: Event) {
      if (menuRef.current && !menuRef.current.contains(e.target as Document)) {
        setShowMenu(false);
      }
    }
    window.addEventListener(`click`, handleOutsideClick);

    return () => window.removeEventListener(`click`, handleOutsideClick);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [router.pathname]); //eslint-disable-line

  useOutsideClick(menuRef, () => setShowMenu(false));

  return (
    <div className={styles.headerAccount} ref={menuRef}>
      <div
        className={classNames(
          styles.headerAccountBtn,
          showMenu && styles.headerAccountBtnActive,
        )}
        onClick={() => setShowMenu(!showMenu)}
      >
        <AccountImage image={user.avatarURL} />
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{user.displayName}</span>
        </div>
        <Triangle className={styles.triangle} />
      </div>

      {showMenu && (
        <div className={styles.headerAccountMenu}>
          <MenuBtn icon="avatar" text="Profile" link={`/${user.ethAddress}`} />

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
          <MenuBtn link="/settings" icon="settings" text="Settings" />

          <span className={styles.divider} />

          <MenuBtn
            icon="log-out"
            text="Log out"
            onClick={handleWalletDisconnect}
            accent
          />
        </div>
      )}
    </div>
  );
};

export default HeaderAccount;
