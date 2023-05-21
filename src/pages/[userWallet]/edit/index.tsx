import GoBackBtn from '@/components/unknown/goBackBtn';
import ProfileLayout from '@/containers/ProfileLayout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const EditPage = () => {
  const router = useRouter();

  return <GoBackBtn link={`/${router.query.userWallet as string}`} />;
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout noHeader>{page}</ProfileLayout>;
};

export default EditPage;
