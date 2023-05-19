import ProfileHeader from '@/components/profile/profileHeader';
import ProfileMenu from '@/components/profile/profileMenu';
import WhoToFollow from '@/components/unknown/whoToFollow';
import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { IUser } from '@/types/user';
import { useAppSelector } from '@/app/hooks';
import Loader from '@/components/unknown/loader';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);

  const { token, user } = useAppSelector((state) => state.user);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${router.query.profileId}`,
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
  }, [router.query.profileId, token]);

  useEffect(() => {
    const userId = router.query.profileId;
    if (userId && userId.length !== 0 && userId !== user._id) {
      fetchUser();
    } else {
      setUserInfo(user);
      setIsLoading(false);
    }
  }, [router.query.profileId, user, fetchUser]);

  return (
    <div className="container">
      <ProfileMenu />
      <div>
        {isLoading && !userInfo ? (
          <Loader />
        ) : userInfo ? (
          <ProfileHeader
            displayName={userInfo.displayName}
            username={userInfo.username}
            ethAddress={userInfo.ethAddress}
          />
        ) : null}
        {children}
      </div>
      <WhoToFollow />
    </div>
  );
};

export default ProfileLayout;
