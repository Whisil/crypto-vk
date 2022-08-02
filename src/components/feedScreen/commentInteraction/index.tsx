import styles from './styles.module.scss';

interface Props {
  isReply?: boolean;
  showMoreCondition: boolean;
  firstOnClick(): void;
  secondOnClick(): void;
  counter?: number;
}

const CommentInteraction = ({
  isReply,
  showMoreCondition,
  firstOnClick,
  secondOnClick,
  counter,
}: Props) => {
  return (
    <div className={styles.commentInteractions}>
      {showMoreCondition && (
        <div className={styles.commentInteractionsBtn} onClick={firstOnClick}>
          Show more{counter && ` (${counter})`}
        </div>
      )}
      <div className={styles.commentInteractionsBtn} onClick={secondOnClick}>
        Hide {isReply ? `replies` : `comments`}
      </div>
    </div>
  );
};

export default CommentInteraction;
