import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  small?: boolean;
  xs?: boolean;
  large?: boolean;
  image?: string;
  className?: string;
}

const AccountImage = ({ small, large, image = ``, className, xs }: Props) => {
  return (
    <div className={classNames(styles.imageBox, className)}>
      <img
        src={image !== `` ? image : `/images/account-placeholder.png`}
        width={xs ? 30 : small ? 34 : large ? 80 : 40}
        height={xs ? 30 : small ? 34 : large ? 80 : 40}
        alt="profile avatar"
      />
    </div>
  );
};

export default AccountImage;
