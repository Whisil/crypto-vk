import { useState } from 'react';
import classNames from 'classnames';
import FollowSuggestion from '../followSuggestion';
import styles from './styles.module.scss';

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
      <span
        className={styles.showMoreBtn}
        onClick={() => setShowMore((showMore) => !showMore)}
      >
        {showMore ? 'Show less' : 'Show more'}
      </span>
    </div>
  );
};

export default WhoToFollow;
