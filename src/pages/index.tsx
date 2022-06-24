import Feed from '@/components/feed/feed';
import ProfileBlock from '@/components/feed/profileBlock';
import MainLayout from '@/containers/MainLayout';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.homeContainer}>
        <ProfileBlock />
        <Feed />
      </div>
    </MainLayout>
  );
}
