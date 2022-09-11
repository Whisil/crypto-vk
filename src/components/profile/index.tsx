import WhoToFollow from '@/components/unknown/whoToFollow';
import ProfileHeader from './profileHeader';
import ProfileMenu from './profileMenu';
import ProfileFeed from './profileFeed';

const ProfileScreen = () => {
  return (
    <div className="container">
      <ProfileMenu />
      <div>
        <ProfileHeader />
        <ProfileFeed />
      </div>
      <WhoToFollow />
    </div>
  );
};

export default ProfileScreen;
