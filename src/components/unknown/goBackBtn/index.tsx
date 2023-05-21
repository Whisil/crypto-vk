import Link from 'next/link';
import GoBackIcon from '@/public/images/icons/go-back.svg';

import styles from './styles.module.scss';

const GoBackBtn = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <a className={styles.goBackBtn}>
        <GoBackIcon />
        <span className={styles.goBackBtnText}>Go Back</span>
      </a>
    </Link>
  );
};

export default GoBackBtn;
