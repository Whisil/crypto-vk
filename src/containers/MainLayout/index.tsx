import Header from '@/components/header/headerWrapper';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="backgroundColor">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
