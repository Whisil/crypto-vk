import classNames from 'classnames';
import ReactDOM from 'react-dom';
import ErrorIcon from '@/public/images/icons/error.svg';
import SuccessIcon from '@/public/images/icons/success.svg';

import styles from './styles.module.scss';

interface ToastProps {
  type?: 'Error' | 'OK' | '';
  onClose?: () => void;
  text: string;
}

const Toast = ({ type, onClose, text }: ToastProps) => {
  return ReactDOM.createPortal(
    <div className={styles.toastContainer}>
      <div
        className={classNames(styles.toast, type === `Error` && styles.error)}
        onAnimationEnd={onClose}
        onClick={onClose}
      >
        <span className={styles.toastIcon}>
          {type === `Error` ? <ErrorIcon /> : <SuccessIcon />}
        </span>
        <span className={styles.toastText}>{text}</span>
      </div>
    </div>,
    document.querySelector(`body`) as HTMLElement,
  );
};

export default Toast;
