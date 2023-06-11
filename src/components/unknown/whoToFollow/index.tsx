import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import FollowSuggestion from '../followSuggestion';
import styles from './styles.module.scss';
import LinkRippleBtn from '../linkRippleBtn';
import { IUser } from '@/types/user';
import { useAppSelector } from '@/app/hooks';
import Loader from '../loader';

const WhoToFollow = () => {
  const [showMore, setShowMore] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAppSelector((state) => state.user);

  const handleUsersFetch = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getShowcaseUsers`, {
      method: `GET`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resUsers) => {
        setIsLoading(false);
        setUsers(resUsers);
      })
      .catch((err) => console.log(err.message));
  }, [token]);

  useEffect(() => {
    handleUsersFetch();
  }, [handleUsersFetch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Who to follow?</h2>

      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader variant="small" relative />
        </div>
      ) : (
        <>
          {users.length !== 0 ? (
            <ul
              className={classNames(
                styles.followList,
                showMore ? styles.showAll : {},
              )}
            >
              {users?.map((item) => (
                <li key={item._id}>
                  <FollowSuggestion
                    displayName={item.displayName}
                    avatarURL={item.avatarURL as string}
                    username={item.username}
                    ethAddress={item.ethAddress}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <span className={styles.emptyText}>No one {`:)`}</span>
          )}

          {users.length > 4 && (
            <LinkRippleBtn
              onClick={() => setShowMore((showMore) => !showMore)}
              text={showMore ? `Show less` : `Show more`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WhoToFollow;
