import classNames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  src: string;
  commentMedia?: boolean;
}

const MediaContainer = ({ src, commentMedia }: Props) => {
  return (
    <div
      className={classNames(styles.media, commentMedia && styles.mediaComment)}
    >
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
