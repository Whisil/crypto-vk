import ProfileFeed from '@/components/profile/profileFeed';
import ProfileLayout from '@/containers/ProfileLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

const ProfileFeedContainer: NextPageWithLayout = () => {
  const router = useRouter();
  return <ProfileFeed variant={router.query.profileFeedVariant} />;
};

ProfileFeedContainer.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileFeedContainer;
