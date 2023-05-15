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
import { setNewPost } from '@/features/postsSlice';

import styles from './styles.module.scss';
import { addUserPost } from '@/features/userSlice';
import { IComment } from '@/types/comment';

interface Props {
  commentInput?: boolean;
  setComment?: (value: IComment) => void;
  commentOnPostId?: string;
  isReply?: boolean;
}

const PostInput = ({
  commentInput,
  isReply,
  setComment,
  commentOnPostId,
}: Props) => {
  const [inputText, setInputText] = useState(``);
  const [btnDissable, setBtnDissable] = useState(false);
  const [mediaURI, setMediaURI] = useState<string>(``);

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
    handleCloseBtn();
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
        setComment && setComment(comment);
        endOfInteraction();
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    if (textInput && textInput.current) {
      textInput.current.focus();
    }
  }, [textInput]);

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
              onClick={commentInput ? handleComment : handlePost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
