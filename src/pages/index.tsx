import Feed from '@/components/feedScreen';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/unknown/whoToFollow';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';

import styles from '../styles/index.module.scss';
import FeedLayout from '@/containers/FeedLayout';

const Home: NextPageWithLayout = () => {
  // const [showFollow, setShowFollow] = useState<boolean>(false);

  // useEffect(() => {
  //   function handleResize() {
  //     if (window.innerWidth <= 1040) {
  //       setShowFollow(false);
  //     } else if (window.innerWidth > 1040) {
  //       setShowFollow(true);
  //     }
  //   }
  //   window.addEventListener(`resize`, handleResize);

  //   return () => window.removeEventListener(`resize`, handleResize);
  // }, []);

  return <Feed />;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <FeedLayout>{page}</FeedLayout>;
};

export default Home;
