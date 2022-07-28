import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  src: string;
}

const MediaContainer = ({ src }: Props) => {
  return (
    <div className={styles.media}>
      <Image
        className={styles.mediaContent}
        src={src}
        layout="fill"
        objectFit="contain"
        alt="post media"
      />
    </div>
  );
};

export default MediaContainer;
