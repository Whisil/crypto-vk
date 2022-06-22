import Home from 'public/images/icons/home-icon.svg';
import Explore from 'public/images/icons/explore-icon.svg';
import Messages from 'public/images/icons/messages-icon.svg';
import Market from 'public/images/icons/market-icon.svg';
import Notifications from 'public/images/icons/notifications-icon.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface NavBtnProps {
  variant: 'Home' | 'Explore' | 'Messages' | 'Market' | 'Notifications';
  active?: boolean;
}

const iconTypes = {
  Home: Home,
  Explore: Explore,
  Messages: Messages,
  Market: Market,
  Notifications: Notifications,
};

const NavBtn = ({ variant, active }: NavBtnProps) => {
  let Icon = iconTypes[variant];
  return (
    <div className={classNames(styles.btn, active && styles.btnActive)}>
      <Icon />
      <span className={styles.btnLabel}>{variant}</span>
    </div>
  );
};

export default NavBtn;
