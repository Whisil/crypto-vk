import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import FeedLayout from '@/containers/FeedLayout';

import PostScreen from '@/components/postScreen';

const PostPage: NextPageWithLayout = () => {
  return <PostScreen />;
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <FeedLayout>{page}</FeedLayout>;
};

export default PostPage;
