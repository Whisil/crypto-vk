import ProfileHeader from '@/components/profile/profileHeader';
import ProfileMenu from '@/components/profile/profileMenu';
import WhoToFollow from '@/components/unknown/whoToFollow';
import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<{
    id: string;
    attributes: {
      ethAddress: string;
      posts: any[];
      username: string;
      displayName: string;
    };
  }>({
    id: ``,
    attributes: {
      ethAddress: ``,
      posts: [],
      username: ``,
      displayName: ``,
    },
  });

  const router = useRouter();
  const { Moralis } = useMoralis();

  useEffect(() => {
    if (router.query.profileId && router.query.profileId.length !== 0) {
      Moralis.Cloud.run(`userFetch`, { id: router.query.profileId }).then(
        (res) =>
          res[0] &&
          setUserInfo({
            id: res[0].id,
            attributes: res[0].attributes,
          }),
      );
    }
  }, [router.query.profileId, Moralis.Cloud]);

  return (
    <div className="container">
      <ProfileMenu />
      <div>
        <ProfileHeader
          displayName={userInfo.attributes.displayName}
          username={userInfo.attributes.username}
          ethAddress={userInfo.attributes.ethAddress}
        />
        {children}
      </div>
      <WhoToFollow />
    </div>
  );
};

export default ProfileLayout;
