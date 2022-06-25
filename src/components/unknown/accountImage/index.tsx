import Image from 'next/image';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
  small?: boolean;
  large?: boolean;
  image?: string;
  className?: string;
}

const AccountImage = ({ small, large, image = '', className }: Props) => {
  return (
    <span className={classNames(styles.imageBox, className)}>
      <Image
        src={image !== '' ? image : `/images/account-placeholder.png`}
        width={small ? 34 : large ? 80 : 40}
        height={small ? 34 : large ? 80 : 40}
      />
    </span>
  );
};

export default AccountImage;
