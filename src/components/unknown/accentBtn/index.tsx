import classNames from 'classnames';
import RippleBtn from '../rippleBtn';

import styles from './styles.module.scss';

interface Props {
  text: string;
  className?: string | boolean;
  onClick?(): void;
}

const AccentBtn = ({ text, onClick, className }: Props) => {
  return (
    <RippleBtn variant="accent">
      <div className={classNames(styles.btn, className)} onClick={onClick}>
        <span>{text}</span>
      </div>
    </RippleBtn>
  );
};

export default AccentBtn;
