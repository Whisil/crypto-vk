import Feed from '@/components/feedScreen/feed';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/feedScreen/whoToFollow';
import MainLayout from '@/containers/MainLayout';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.homeContainer}>
        <ProfileBlock />
        <Feed />
        <WhoToFollow />
      </div>
    </MainLayout>
  );
}
