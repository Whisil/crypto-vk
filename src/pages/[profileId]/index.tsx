import ProfileFeed from '@/components/profile/profileFeed';
import ProfileLayout from '@/containers/ProfileLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const Profile: NextPageWithLayout = () => {
  return <ProfileFeed />;
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default Profile;
