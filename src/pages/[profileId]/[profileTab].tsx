import ProfileFeed from '@/components/profile/profileFeed';
import ProfileLayout from '@/containers/ProfileLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

const ProfileTab: NextPageWithLayout = () => {
  const router = useRouter();

  return <ProfileFeed variant={router.query.profileTab} />;
};

ProfileTab.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileTab;
