import styles from './styles.module.scss';

interface ProfileCounter {
  number: number;
  title: string;
}

const ProfileCounter = ({ number, title }: ProfileCounter) => {
  return (
    <div className={styles.counter}>
      <span className={styles.number}>{number}</span>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default ProfileCounter;
