import Feed from '@/components/feedScreen/feed';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/unknown/whoToFollow';
import MainLayout from '@/containers/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        <ProfileBlock />
        <Feed />
        <WhoToFollow />
      </div>
    </MainLayout>
  );
}
