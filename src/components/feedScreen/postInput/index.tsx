import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import AccountImage from '@/components/unknown/accountImage';
import AccentBtn from '@/components/unknown/accentBtn';
import Link from 'next/link';
import EmojiIcon from 'public/images/icons/emoji.svg';
import ImageIcon from 'public/images/icons/image-media.svg';
import CloseIcon from 'public/images/icons/close.svg';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addCommentToPost, setNewPost } from '@/features/postsSlice';

import styles from './styles.module.scss';
import { addUserPost } from '@/features/userSlice';
import { setNewComment } from '@/features/commentsSlice';
import useMediaBlob from '@/hooks/useMediaBlob';

interface Props {
  commentInput?: boolean;
  commentOnPostId?: string;
  isReply?: boolean;
}

const PostInput = ({ commentInput, isReply, commentOnPostId }: Props) => {
  const [inputText, setInputText] = useState(``);
  const [btnDissable, setBtnDissable] = useState(false);

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { mediaURLs, handleFileChange, handleClose } = useMediaBlob();
  console.log(mediaURLs);

  const fileInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  const handleFormData = () => {
    const formData = new FormData();
    formData.append(`text`, inputText.trim());

    if (
      fileInput.current &&
      fileInput.current.files &&
      fileInput.current.files[0]
    ) {
      const fileInputValue = fileInput.current.files[0];
      formData.append(`file`, fileInputValue);
    }

    return formData;
  };

  const endOfInteraction = () => {
    handleClose(fileInput);
    setInputText(``);
    if (textInput.current) {
      textInput.current.textContent = ``;
    }
  };

  const handlePost = async () => {
    const formData = handleFormData();

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
        endOfInteraction();
      })
      .catch((err) => console.log(err));
  };

  const handleComment = async () => {
    const formData = handleFormData();

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/create/${commentOnPostId}`,
      {
        method: `POST`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )
      .then((res) => res.json())
      .then((comment) => {
        dispatch(setNewComment(comment));
        dispatch(
          addCommentToPost({ commentId: comment._id, postId: commentOnPostId }),
        );
        endOfInteraction();
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    if (textInput && textInput.current) {
      textInput.current.focus();
    }
  }, [textInput]);

  useEffect(() => {
    if (
      inputText.length > 500 ||
      (inputText.length === 0 && !mediaURLs) ||
      (inputText.length !== 0 && /^\s*$/.test(inputText))
    ) {
      setBtnDissable(true);
    } else {
      setBtnDissable(false);
    }
  }, [inputText, mediaURLs]);

  return (
    <div
      className={classNames(
        styles.postInput,
        commentInput && styles.commentPostInput,
      )}
      onClick={() => textInput.current?.focus()}
    >
      <Link href="/">
        <a className={styles.account}>
          <AccountImage />
        </a>
      </Link>
      <div className={styles.wrapper}>
        <div className={styles.inputRow}>
          {inputText.length === 0 && (
            <span className={styles.placeholder}>
              {commentInput ? `Have a comment?` : `What's on your mind?`}
            </span>
          )}

          <div
            className={styles.input}
            contentEditable="true"
            onInput={(e) => setInputText(e.currentTarget.innerText as string)}
            ref={textInput}
            onFocus={(e) => setEndOfInput(e.target)}
          />
        </div>
        {mediaURLs && (
          <div
            className={styles.mediaContainer}
            style={
              mediaURLs
                ? { backgroundImage: `url(${mediaURLs.postInput})` }
                : {}
            }
          >
            <div
              className={styles.clearMediaBtn}
              onClick={() => handleClose(fileInput)}
            >
              <CloseIcon />
            </div>
            <img
              src={mediaURLs.postInput}
              className={styles.mediaFile}
              alt="thumbnail"
            />
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
                mediaURLs && styles.inputDisabled,
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
                onChange={(e) => handleFileChange(`postInput`, e)}
                ref={fileInput}
                disabled={mediaURLs ? true : false}
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
              onClick={commentInput ? handleComment : handlePost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
