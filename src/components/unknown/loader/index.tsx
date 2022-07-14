import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  variant?: 'small';
}

const Loader = ({ variant }: Props) => {
  return (
    <div
      className={classNames(styles.bounce, variant === `small` && styles.small)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
