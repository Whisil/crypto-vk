import Header from '@/components/header/headerWrapper';

const MainLayout = ({ children }: any) => {
  return (
    <div className="backgroundColor">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
