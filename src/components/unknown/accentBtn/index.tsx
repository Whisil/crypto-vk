import classNames from 'classnames';
import RippleBtn from '../rippleBtn';

import styles from './styles.module.scss';

interface Props {
  text: string;
  className?: string | boolean;
  containerClassName?: string;
  onClick?(): void;
}

const AccentBtn = ({ text, onClick, className, containerClassName }: Props) => {
  return (
    <RippleBtn variant="accent" className={containerClassName}>
      <button className={classNames(styles.btn, className)} onClick={onClick}>
        <span>{text}</span>
      </button>
    </RippleBtn>
  );
};

export default AccentBtn;
