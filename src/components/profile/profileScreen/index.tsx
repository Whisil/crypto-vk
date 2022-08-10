import WhoToFollow from '@/components/unknown/whoToFollow';
import ProfileMenu from '../profileMenu';

const ProfileScreen = () => {
  return (
    <div className="container">
      <ProfileMenu />
      <WhoToFollow />
    </div>
  );
};

export default ProfileScreen;
