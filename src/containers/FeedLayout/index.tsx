import classNames from 'classnames';
import styles from './styles.module.scss';
import ProfileBlock from '@/components/feedScreen/profileBlock';
import WhoToFollow from '@/components/unknown/whoToFollow';

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout = ({ children }: FeedLayoutProps) => {
  return (
    <div className={classNames(`container`, styles.containerSmall)}>
      <ProfileBlock />
      {children}
      <WhoToFollow />
    </div>
  );
};

export default FeedLayout;
