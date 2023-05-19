import NoContentIcon from 'public/images/no-content.svg';

import styles from './styles.module.scss';

const NoContent = ({ text }: { text?: string }) => {
  return (
    <div className={styles.noContent}>
      <NoContentIcon />
      <span className={styles.noContentText}>
        {text ? text : `Nothing here`}
      </span>
    </div>
  );
};

export default NoContent;
