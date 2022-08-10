import IconImport from '@/components/unknown/IconImport';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface NavBtnProps {
  text?: string;
  active?: boolean;
  icon: string;
}

const NavBtn = ({ text, active, icon }: NavBtnProps) => {
  return (
    <div className={classNames(styles.btn, active && styles.btnActive)}>
      <IconImport icon={icon} />
      <span className={styles.btnLabel}>{text}</span>
    </div>
  );
};

export default NavBtn;
