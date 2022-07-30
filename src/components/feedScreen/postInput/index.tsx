import React, { useState, useRef, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import classNames from 'classnames';
import AccountImage from '@/components/unknown/accountImage';
import AccentBtn from '@/components/unknown/accentBtn';
import Link from 'next/link';
import Triangle from 'public/images/icons/triangle.svg';
import EmojiIcon from 'public/images/icons/emoji.svg';
import ImageIcon from 'public/images/icons/image-media.svg';
import CloseIcon from 'public/images/icons/close.svg';

import styles from './styles.module.scss';

interface Props {
  postedPostInfo?(id: string): void;
  commentInput?: boolean;
  commentedPostId?: string;
  newCommentInfo?(id: string): void;
  commentInputFocus?: boolean;
}

const PostInput = ({
  postedPostInfo,
  commentInput,
  commentedPostId,
  newCommentInfo,
  commentInputFocus,
}: Props) => {
  const [inputText, setInputText] = useState(``);
  const [btnDissable, setBtnDissable] = useState(false);
  const [mediaURI, setMediaURI] = useState<string>(``);

  const fileInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  const handleCloseBtn = async () => {
    URL.revokeObjectURL(mediaURI);
    setMediaURI(``);
    if (fileInput.current) {
      fileInput.current.value = ``;
    }
  };

  //Database
  const { Moralis, user } = useMoralis();

  const handlePost = async () => {
    const Post = Moralis.Object.extend(`Posts`);

    let fileInputValue;
    let file: { [key: string]: any } = {};

    if (fileInput.current && fileInput.current.files) {
      fileInputValue = fileInput.current.files[0];
      file = new Moralis.File(`postMedia by ${user?.id}`, fileInputValue);
    }

    const newPost = new Post();

    newPost
      .save({
        text: inputText.length !== 0 ? inputText.trim() : undefined,
        media: file && file._source ? file : undefined,
      })
      .then(() => {
        user?.relation(`posts`).add(newPost);
        user?.save();
        newPost.set(`createdBy`, user);
        postedPostInfo && postedPostInfo(newPost.id);

        newPost.save();

        handleCloseBtn();
        if (textInput.current) {
          textInput.current.textContent = ``;
        }
        setInputText(``);
      });
  };

  const handleComment = async () => {
    const Comment = Moralis.Object.extend(`Comment`);

    const commentedPostQuery = new Moralis.Query(`Posts`);
    commentedPostQuery.equalTo(`objectId`, commentedPostId);
    const commentedPostResult = await commentedPostQuery.first();

    let fileInputValue;
    let file: { [key: string]: any } = {};

    if (fileInput.current && fileInput.current.files) {
      fileInputValue = fileInput.current.files[0];
      file = new Moralis.File(`comment media by ${user?.id}`, fileInputValue);
    }

    const newComment = new Comment();

    newComment
      .save({
        text: inputText.length !== 0 ? inputText.trim() : undefined,
        media: file._source ? file : undefined,
      })
      .then(() => {
        user?.relation(`comments`).add(newComment);
        user?.save();
        newComment.set(`createdBy`, user);
        newComment.set(`onPost`, commentedPostResult);
        newCommentInfo && newCommentInfo(newComment.id);
        commentedPostResult?.relation(`comments`).add(newComment);
        commentedPostResult?.increment(`commentCount`);

        newComment.save();
        commentedPostResult?.save();

        handleCloseBtn();
        if (textInput.current) {
          textInput.current.textContent = ``;
        }
        setInputText(``);
      });
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

  const handleInputChange = (
    e: Event | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.readAsArrayBuffer(target.files[0]);
      reader.onload = function () {
        let blob = null;
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
          <AccountImage small={commentInput} />
        </a>
      </Link>
      <div className={styles.wrapper}>
        {!commentInput && (
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
              What&apos;s on your mind?
            </span>
          )}

          <div
            className={styles.input}
            contentEditable="true"
            onInput={(e) => setInputText(e.currentTarget.textContent as string)}
            ref={textInput}
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
              htmlFor={commentInput ? `commentMediaInput` : `postMediaInput`}
              className={classNames(
                styles.iconWrapper,
                mediaURI.length !== 0 && styles.inputDisabled,
              )}
            >
              <ImageIcon />
              <input
                id={commentInput ? `commentMediaInput` : `postMediaInput`}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className={styles.mediaInput}
                onChange={handleInputChange}
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
              text={commentInput ? `Comment` : `Post it!`}
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
