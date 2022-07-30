import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  variant?: 'small';
  relative?: boolean;
}

const Loader = ({ variant, relative }: Props) => {
  return (
    <div
      className={classNames(
        styles.bounce,
        variant === `small` && styles.small,
        relative && styles.relative,
      )}
    >
      <div className={styles.dotsContainer}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
};

export default Loader;
