import classNames from 'classnames';
import Link from 'next/link';
import RippleBtn from '../rippleBtn';

import styles from './styles.module.scss';

interface Props {
  icon: string;
  text?: string;
  accent?: boolean;
  onClick?(): void;
  link?: string;
  large?: boolean;
}

const MenuBtn = ({ icon, text, accent, onClick, link, large }: Props) => {
  const Icon = require(`public/images/icons/${icon}.svg`).default;

  return (
    <RippleBtn>
      {!link || link?.length === 0 ? (
        <div
          className={classNames(
            styles.menuItem,
            accent && styles.accentBtn,
            large && styles.large,
          )}
          onClick={onClick}
        >
          <Icon />
          <span>{text}</span>
        </div>
      ) : (
        <Link href={link} passHref>
          <a>
            <span
              className={classNames(
                styles.menuItem,
                accent && styles.accentBtn,
                large && styles.large,
              )}
              onClick={onClick}
            >
              <Icon />
              <span>{text}</span>
            </span>
          </a>
        </Link>
      )}
    </RippleBtn>
  );
};

export default MenuBtn;
