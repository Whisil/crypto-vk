import Post from '../post';
import PostInput from '../postInput';
import styles from './styles.module.scss';

const Feed = () => {
  return (
    <div className={styles.feed}>
      <PostInput />
      <Post />
    </div>
  );
};

export default Feed;
