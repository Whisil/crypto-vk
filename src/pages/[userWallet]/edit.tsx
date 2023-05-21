import ProfileLayout from '@/containers/ProfileLayout';
import { ReactElement } from 'react';

const EditPage = () => {
  return `hey`;
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout noHeader>{page}</ProfileLayout>;
};

export default EditPage;
