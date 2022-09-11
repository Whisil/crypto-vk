import Feed from '@/components/feedScreen';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/unknown/whoToFollow';
import MainLayout from '@/containers/MainLayout';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import styles from '../styles/index.module.scss';

export default function Home() {
  const [showFollow, setShowFollow] = useState<boolean>(
    window.innerWidth <= 1040 ? false : true,
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1040) {
        setShowFollow(false);
      } else if (window.innerWidth > 1040) {
        setShowFollow(true);
      }
    }
    window.addEventListener(`resize`, handleResize);

    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return (
    <MainLayout>
      <div className={classNames(`container`, styles.containerSmall)}>
        <ProfileBlock />
        <Feed />
        {showFollow && <WhoToFollow />}
      </div>
    </MainLayout>
  );
}
