import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  small?: boolean;
  large?: boolean;
  image?: string;
}

const accountImage = ({ small, large, image = '' }: Props) => {
  return (
    <span className={styles.imageBox}>
      <Image
        src={image !== '' ? image : `/images/account-placeholder.png`}
        width={small ? 34 : large ? 80 : 40}
        height={small ? 34 : large ? 80 : 40}
      />
    </span>
  );
};

export default accountImage;
