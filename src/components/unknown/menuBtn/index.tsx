import classNames from 'classnames';
import Link from 'next/link';
import RippleBtn from '../rippleBtn';

import styles from './styles.module.scss';

interface Props {
  icon: string;
  text: string;
  accent?: boolean;
  onClick?(): void;
  link?: string;
}

const MenuBtn = ({ icon, text, accent, onClick, link }: Props) => {
  const Icon = require(`public/images/icons/${icon}.svg`).default;

  return (
    <RippleBtn>
      {!link || link?.length === 0 ? (
        <div
          className={classNames(styles.menuItem, accent && styles.accentBtn)}
          onClick={onClick}
        >
          <Icon />
          <span>{text}</span>
        </div>
      ) : (
        <Link href="/" passHref>
          <a>
            <div
              className={classNames(
                styles.menuItem,
                accent && styles.accentBtn,
              )}
              onClick={onClick}
            >
              <Icon />
              <span>{text}</span>
            </div>
          </a>
        </Link>
      )}
    </RippleBtn>
  );
};

export default MenuBtn;
