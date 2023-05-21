import ProfileHeader from '@/components/profile/profileHeader';
import ProfileMenu from '@/components/profile/profileMenu';
import WhoToFollow from '@/components/unknown/whoToFollow';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { IUser } from '@/types/user';
import { useAppSelector } from '@/app/hooks';
import Loader from '@/components/unknown/loader';

const ProfileLayout = ({
  children,
  noHeader,
}: {
  children: React.ReactNode;
  noHeader?: boolean;
}) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { token, user } = useAppSelector((state) => state.user);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${router.query.userWallet}`,
      {
        method: `GET`,
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((resUser) => {
        setUserInfo(resUser);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [router.query.userWallet, token]);

  useEffect(() => {
    const userWallet = router.query.userWallet;
    if (
      userWallet &&
      userWallet.length !== 0 &&
      userWallet !== user.ethAddress
    ) {
      fetchUser();
    } else {
      setUserInfo(user);
      setIsCurrentUser(true);
      setIsLoading(false);
    }
  }, [router.query.userWallet, user, fetchUser]);

  return (
    <div className="container">
      <ProfileMenu />
      <div>
        {isLoading && !userInfo ? (
          <Loader />
        ) : userInfo && !noHeader ? (
          <ProfileHeader
            displayName={userInfo.displayName}
            username={userInfo.username}
            ethAddress={userInfo.ethAddress}
            isCurrentUser={isCurrentUser}
          />
        ) : null}
        {children}
      </div>
      <WhoToFollow />
    </div>
  );
};

export default ProfileLayout;
