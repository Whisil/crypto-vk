import RippleBtn from '../rippleBtn';
import Link from 'next/link';

import styles from './styles.module.scss';

interface LinkRippleBtnProps {
  text: string;
  link?: string;
  onClick?(): void;
}

const LinkRippleBtn = ({ text, link, onClick }: LinkRippleBtnProps) => {
  return (
    <RippleBtn className={styles.btnRipple}>
      {onClick ? (
        <span onClick={onClick} className={styles.btn}>
          {text}
        </span>
      ) : (
        <Link href={link ? link : `/`}>
          <a className={styles.btn}>{text}</a>
        </Link>
      )}
    </RippleBtn>
  );
};

export default LinkRippleBtn;
