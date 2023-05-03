import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import AccountImage from '@/components/unknown/accountImage';
import AccentBtn from '@/components/unknown/accentBtn';
import Link from 'next/link';
import Triangle from 'public/images/icons/triangle.svg';
import EmojiIcon from 'public/images/icons/emoji.svg';
import ImageIcon from 'public/images/icons/image-media.svg';
import CloseIcon from 'public/images/icons/close.svg';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { IPost } from '@/types/post';
import { setNewPost } from '@/features/postsSlice';

import styles from './styles.module.scss';
import { addUserPost } from '@/features/userSlice';

interface Props {
  setNewPost?(post: IPost): void;
  commentInput?: boolean;
  commentedPostId?: string;
  newCommentInfo?(id: string): void;
  commentInputFocus?: boolean;
  isReply?: boolean;
  replyTo?: string;
  replyOn?: string;
  inputUsername?: string;
}

const PostInput = ({
  commentInput,
  commentedPostId,
  newCommentInfo,
  commentInputFocus,
  isReply,
  replyOn,
  replyTo,
  inputUsername,
}: Props) => {
  const [inputText, setInputText] = useState(``);
  const [btnDissable, setBtnDissable] = useState(false);
  const [mediaURI, setMediaURI] = useState<string>(``);
  const [replyToInfo, setReplyToInfo] = useState<{
    id: string;
    displayName: string;
  }>({ id: ``, displayName: `` });

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const fileInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  const handleCloseBtn = async () => {
    URL.revokeObjectURL(mediaURI);
    setMediaURI(``);
    if (fileInput.current) {
      fileInput.current.value = ``;
    }
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append(`text`, inputText.trim());

    if (fileInput.current && fileInput.current.files) {
      const fileInputValue = fileInput.current.files[0];
      formData.append(`file`, fileInputValue);
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/create`, {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((post) => {
        // using [post], because reducer has [...state, ...payload]
        dispatch(setNewPost([post]));
        dispatch(addUserPost(post._id));
        handleCloseBtn();
        setInputText(``);
        if (textInput.current) {
          textInput.current.textContent = ``;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleComment = async (reply?: boolean) => {
    // const Comment = Moralis.Object.extend(`Comment`);

    // const commentedPostQuery = new Moralis.Query(`Posts`);
    // commentedPostQuery.equalTo(`objectId`, commentedPostId);
    // const commentedPostResult = await commentedPostQuery.first();

    let fileInputValue;
    // let file: { [key: string]: any } = {};

    if (fileInput.current && fileInput.current.files) {
      fileInputValue = fileInput.current.files[0];
      // file = new Moralis.File(`comment media by ${user?.id}`, fileInputValue);
    }

    const newComment = new Comment();

    // newComment
    //   .save({
    //     text: inputText.length !== 0 ? inputText.trim() : undefined,
    //     media: file._source ? file : undefined,
    //   })
    //   .then(async () => {
    //     user?.relation(`comments`).add(newComment);
    //     user?.save();
    //     newComment.set(`createdBy`, user);
    //     newComment.set(`onPost`, commentedPostResult);
    //     if (reply) {
    //       const repliedToComment = new Moralis.Query(`Comment`);
    //       await repliedToComment
    //         .equalTo(`objectId`, replyOn)
    //         .first()
    //         .then((res) => {
    //           newComment.set(`replyTo`, res);
    //           if (res) {
    //             res.increment(`replyCount`);
    //             res.save();
    //           }
    //         });
    //     }
    //     newCommentInfo && newCommentInfo(newComment.id);
    //     commentedPostResult?.relation(`comments`).add(newComment);
    //     commentedPostResult?.increment(`commentCount`);

    //     newComment.save();
    //     commentedPostResult?.save();

    //     handleCloseBtn();
    //     if (textInput.current) {
    //       textInput.current.textContent = ``;
    //     }
    //     setInputText(``);
    //   });
  };

  //Input handlers

  useEffect(() => {
    if (textInput && textInput.current) {
      textInput.current.focus();
    }
  }, [commentInputFocus, textInput]);

  useEffect(() => {
    if (
      inputText.length > 500 ||
      (inputText.length === 0 && mediaURI === ``) ||
      (inputText.length !== 0 && /^\s*$/.test(inputText))
    ) {
      setBtnDissable(true);
    } else {
      setBtnDissable(false);
    }
  }, [inputText, mediaURI]);

  const handleFileInputChange = (
    e: Event | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.readAsArrayBuffer(target.files[0]);
      reader.onload = function () {
        let blob = new Blob();
        if (target.files && target.files[0]) {
          blob = new Blob([reader.result as BlobPart], {
            type: target.files[0].type,
          });
        }

        const mediaBlobURI = URL.createObjectURL(blob);
        setMediaURI(mediaBlobURI);
      };
    }
  };

  //Reply username push

  const setEndOfInput = (target: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
    target.focus();
    range.detach();
  };

  // useEffect(() => {
  //   if (
  //     textInput &&
  //     textInput.current &&
  //     isReply &&
  //     inputUsername &&
  //     inputUsername.length !== 0
  //   ) {
  //     textInput.current.textContent = `@${inputUsername} `;
  //     setInputText(`nothing`);
  //     setEndOfInput(textInput.current);
  //   }
  // }, [inputUsername, isReply]);

  return (
    <div
      className={classNames(
        styles.postInput,
        (commentInput || isReply) && styles.commentPostInput,
      )}
      onClick={() => textInput.current?.focus()}
    >
      <Link href="/">
        <a className={styles.account}>
          <AccountImage small={commentInput || isReply} />
        </a>
      </Link>
      <div className={styles.wrapper}>
        {!commentInput && !isReply && (
          <div className={styles.collectionRow}>
            <div className={styles.collection}>
              <div className={styles.collectionBtn}>
                <span>Collection</span>
                <Triangle />
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.infoBtn}>i</span>
              <div className={styles.infoBox}>
                If you choose a collection, the media in your post becomes an
                {` `}
                <a href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">
                  NFT
                </a>
              </div>
            </div>
          </div>
        )}

        <div className={styles.inputRow}>
          {inputText.length === 0 && (
            <span className={styles.placeholder}>
              {commentInput
                ? `Have a comment?`
                : isReply && replyToInfo.displayName
                ? `Reply to ${replyToInfo.displayName}`
                : isReply && !replyToInfo.displayName
                ? `Reply`
                : `What's on your mind?`}
            </span>
          )}

          <div
            className={styles.input}
            contentEditable="true"
            onInput={(e) => setInputText(e.currentTarget.textContent as string)}
            ref={textInput}
            onFocus={(e) => setEndOfInput(e.target)}
          />
        </div>
        {mediaURI && (
          <div
            className={styles.mediaContainer}
            style={
              mediaURI && mediaURI.length !== 0
                ? { backgroundImage: `url(${mediaURI})` }
                : {}
            }
          >
            <div className={styles.clearMediaBtn} onClick={handleCloseBtn}>
              <CloseIcon />
            </div>
            <img src={mediaURI} className={styles.mediaFile} alt="thumbnail" />
          </div>
        )}
        <div className={styles.bottomRow}>
          <div className={styles.icons}>
            <div className={styles.iconWrapper}>
              <EmojiIcon />
            </div>
            <label
              htmlFor={
                commentInput || isReply ? `commentMediaInput` : `postMediaInput`
              }
              className={classNames(
                styles.iconWrapper,
                mediaURI.length !== 0 && styles.inputDisabled,
              )}
            >
              <ImageIcon />
              <input
                id={
                  commentInput || isReply
                    ? `commentMediaInput`
                    : `postMediaInput`
                }
                type="file"
                name="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className={styles.mediaInput}
                onChange={handleFileInputChange}
                ref={fileInput}
                disabled={mediaURI.length !== 0 ? true : false}
              />
            </label>
          </div>

          <div className={styles.btnContainer}>
            <span
              className={classNames(
                styles.characterCount,
                inputText.length > 500 && styles.characterCountAccent,
                inputText.length === 0 && styles.characterCountDisabled,
              )}
            >
              {inputText.length} / 500
            </span>

            <AccentBtn
              text={commentInput ? `Comment` : isReply ? `Reply` : `Post it!`}
              className={btnDissable && styles.btnDissabled}
              onClick={
                commentInput
                  ? handleComment
                  : isReply
                  ? () => handleComment(true)
                  : handlePost
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
