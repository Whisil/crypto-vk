import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Comment from '../comment';
import Loader from '@/components/unknown/loader';
import PostInput from '../postInput';

import styles from './styles.module.scss';
import CommentInteraction from '../commentInteraction';

interface Props {
  timestamp?: string;
  commentId: string;
  media: string;
  text: string;
  handleCommentDelete?(id: string): void;
  createdById: string;
  likeCount: number;
  replyCount: number;
  postId: string;
  newRepliesSwitch?: boolean;
}

const CommentContainer = ({
  timestamp,
  commentId,
  media,
  text,
  handleCommentDelete,
  createdById,
  likeCount,
  replyCount,
  postId,
  newRepliesSwitch,
}: Props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [replyFetchOffset, setReplyFetchOffset] = useState<number>(0);
  const [newReplyId, setNewReplyId] = useState<string[]>([]);
  const [replyLoader, setReplyLoader] = useState<boolean>(false);
  const [secondaryReplyLoader, setSecondaryReplyLoader] =
    useState<boolean>(false);
  const [replyDeleteId, setReplyDeleteId] = useState<string>(``);
  const [newReplies, setNewReplies] = useState<any[]>([]);
  const [showNewReplies, setShowNewReplies] = useState<boolean>(
    newRepliesSwitch ? newRepliesSwitch : false,
  );

  const { Moralis } = useMoralis();

  const replyQuery = new Moralis.Query(`Comment`);

  //New Reply

  const newReplyInfo = (id: string) => {
    setNewReplyId((previousId) => [id, ...previousId]);
  };

  useEffect(() => {
    if (newReplyId.length !== 0) {
      replyQuery.get(newReplyId[0]).then((reply) => {
        setNewReplies((replies) => [reply, ...replies]);
      });
    }
  }, [newReplyId]);

  //Handle functions

  const handleShowReplies = () => {
    if (showReplies && showInput) {
      setShowReplies((showReplies) => !showReplies);
      setShowInput((showInput) => !showInput);
    } else {
      setShowReplies((showReplies) => !showReplies);
    }
  };

  const handleShowInput = () => {
    setShowInput((showInput) => !showInput);
  };

  //Replies fetching

  const repliesFetch = () => {
    new Moralis.Query(`Comment`)
      .equalTo(`objectId`, commentId)
      .find()
      .then((repliedComment) => {
        replyQuery
          .equalTo(`replyTo`, repliedComment[0])
          .limit(3)
          .notContainedIn(`objectId`, newReplyId)
          .skip(replyFetchOffset)
          .find()
          .then((fetchedReplies) => {
            if (replies.length === 0) {
              setReplies(fetchedReplies);
            } else {
              setReplies([...replies, ...fetchedReplies]);
            }
            setReplyLoader(false);
            setSecondaryReplyLoader(false);
          });
      });
  };

  useEffect(() => {
    if (showReplies) {
      setReplyLoader(true);
      repliesFetch();
    } else {
      setReplies([]);
      setReplyFetchOffset(0);
    }
  }, [showReplies]);

  useEffect(() => {
    if (replyFetchOffset !== 0) {
      repliesFetch();
    }
  }, [replyFetchOffset]);

  useEffect(() => {
    if (newRepliesSwitch) {
      setNewReplyId([]);
      setNewReplies([]);
    }
  }, [newRepliesSwitch]);

  //Reply Delete

  const handleReplyDelete = (id: string) => {
    setReplyDeleteId(id);
  };

  useEffect(() => {
    if (replyDeleteId !== ``) {
      new Moralis.Query(`Posts`).get(postId).then((post) => {
        post.decrement(`commentCount`);
        post.save();
      });

      new Moralis.Query(`Comment`).get(commentId).then((comment) => {
        comment.decrement(`replyCount`);
        comment.save();
      });

      new Moralis.Query(`Comment`).get(replyDeleteId).then((reply) => {
        const likeQuery = new Moralis.Query(`Likes`);
        likeQuery
          .equalTo(`likedComment`, reply)
          .find()
          .then((res) => Moralis.Object.destroyAll(res));

        reply.destroy();

        if (newReplies.length !== 0) {
          setNewReplies((replies) =>
            replies.filter((reply) => reply.id !== replyDeleteId),
          );
        }

        if (showReplies) {
          setReplies((replies) =>
            replies.filter((reply) => reply.id !== replyDeleteId),
          );
        }

        setReplyDeleteId(``);
      });
    }
  }, [replyDeleteId]);

  return (
    <ul>
      <Comment
        timestamp={timestamp}
        showReplies={showReplies}
        handleShowReplies={handleShowReplies}
        handleShowInput={handleShowInput}
        media={media}
        text={text}
        id={commentId}
        handleCommentDelete={handleCommentDelete}
        createdById={createdById}
        likeCount={likeCount}
        replyCount={replyCount}
      />

      <li>
        <ul className={styles.replyContainer}>
          {showInput && (
            <li>
              <PostInput
                isReply
                replyOn={commentId}
                replyTo={createdById}
                commentedPostId={postId}
                newCommentInfo={newReplyInfo}
              />
            </li>
          )}
          {newReplies.length !== 0 &&
            newReplies.map((item) => (
              <Comment
                timestamp={item.attributes.createdAt}
                key={item.id}
                id={item.id}
                media={item.attributes?.media && item.attributes.media}
                text={item.attributes.text}
                handleCommentDelete={handleReplyDelete}
                createdById={item.attributes.createdBy.id}
                likeCount={item.attributes.likeCount}
              />
            ))}
          {showReplies && replyLoader ? (
            <Loader variant="small" relative />
          ) : showReplies ? (
            <>
              {replies.map((item) => (
                <Comment
                  timestamp={item.attributes.createdAt}
                  key={item.id}
                  id={item.id}
                  media={item.attributes?.media && item.attributes.media}
                  text={item.attributes.text}
                  handleCommentDelete={handleReplyDelete}
                  createdById={item.attributes.createdBy.id}
                  likeCount={item.attributes.likeCount}
                  replyCount={item.attributes.replyCount}
                />
              ))}
              {secondaryReplyLoader && <Loader variant="small" relative />}
              <li>
                <CommentInteraction
                  isReply
                  showMoreCondition={replyCount - 3 - replyFetchOffset > 0}
                  firstOnClick={() => {
                    setReplyFetchOffset(
                      (replyFetchOffset) => replyFetchOffset + 3,
                    );
                    setSecondaryReplyLoader(true);
                  }}
                  secondOnClick={() => {
                    setShowReplies(false);
                    setNewReplyId([]);
                    setNewReplies([]);
                    if (showInput) {
                      setShowInput(false);
                    }
                  }}
                  counter={
                    replyFetchOffset === 0
                      ? replyCount - 3
                      : replyCount - 3 - replyFetchOffset
                  }
                />
              </li>
            </>
          ) : null}
        </ul>
      </li>
    </ul>
  );
};

export default CommentContainer;
