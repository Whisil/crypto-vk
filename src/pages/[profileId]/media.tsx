import ProfileFeed from '@/components/profile/profileFeed';
import ProfileLayout from '@/containers/ProfileLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const ProfileMedia: NextPageWithLayout = () => {
  return <ProfileFeed variant="media" />;
};

ProfileMedia.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default ProfileMedia;
