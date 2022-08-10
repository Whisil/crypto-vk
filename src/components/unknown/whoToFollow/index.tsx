import { useState } from 'react';
import classNames from 'classnames';
import FollowSuggestion from '../followSuggestion';
import styles from './styles.module.scss';
import RippleBtn from '@/components/unknown/rippleBtn';
import LinkRippleBtn from '../linkRippleBtn';

const WhoToFollow = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Who to follow</h2>
      <ul
        className={classNames(
          styles.followList,
          showMore ? styles.showAll : {},
        )}
      >
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
        <li>
          <FollowSuggestion />
        </li>
      </ul>

      <LinkRippleBtn
        onClick={() => setShowMore((showMore) => !showMore)}
        text={showMore ? `Show less` : `Show more`}
      />
    </div>
  );
};

export default WhoToFollow;
