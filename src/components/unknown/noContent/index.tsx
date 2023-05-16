import SadFaceIcon from 'public/images/icons/sad-face.svg';

import styles from './styles.module.scss';

const NoContent = ({ text }: { text?: string }) => {
  return (
    <div className={styles.noContent}>
      <SadFaceIcon className={styles.noContentIcon} />
      <span className={styles.noContentText}>
        {text ? text : `Nothing here`}
      </span>
    </div>
  );
};

export default NoContent;
