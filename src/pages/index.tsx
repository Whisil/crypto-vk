import Feed from '@/components/feedScreen';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';

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
