import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Feed from '@/components/feedScreen';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/unknown/whoToFollow';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import styles from '../styles/index.module.scss';

export default function Home() {
  const [showFollow, setShowFollow] = useState<boolean>(false);

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
    <div className={classNames(`container`, styles.containerSmall)}>
      <ProfileBlock />
      <Feed />
      {showFollow && <WhoToFollow />}
    </div>
  );
}
