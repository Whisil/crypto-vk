import { useState } from 'react';
import AccountImage from '@/components/unknown/accountImage';
import Link from 'next/link';
import classNames from 'classnames';
import Triangle from 'public/images/icons/triangle.svg';
import EmojiIcon from 'public/images/icons/emoji.svg';
import ImageIcon from 'public/images/icons/image-media.svg';

import styles from './styles.module.scss';
import AccentBtn from '@/components/unknown/accentBtn';

const PostInput = () => {
  const [inputText, setInputText] = useState('');
  const [btnDissable, setBtnDissable] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleInput = (e: any) => {
    setInputText(e.target.textContent);
    if (e.target.textContent.length > 100) {
      setBtnDissable(true);
    } else {
      setBtnDissable(false);
    }
  };

  return (
    <div className={styles.postInput}>
      <Link href="#">
        <a className={styles.account}>
          <AccountImage />
        </a>
      </Link>
      <div className={styles.wrapper}>
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
              If you choose a collection, the media in your post becomes an{' '}
              <a href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">
                NFT
              </a>
            </div>
          </div>
        </div>

        <div className={styles.inputRow}>
          {showPlaceholder && inputText.length === 0 && (
            <span className={styles.placeholder}>What's on your mind?</span>
          )}

          <div
            className={styles.input}
            contentEditable="true"
            onInput={(e) => handleInput(e)}
            onFocus={() => setShowPlaceholder(false)}
            onBlur={() => setShowPlaceholder(true)}
          />
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.icons}>
            <div className={styles.iconWrapper}>
              <EmojiIcon />
            </div>
            <div className={styles.iconWrapper}>
              <ImageIcon />
            </div>
          </div>

          <AccentBtn
            text="Post it!"
            className={btnDissable && styles.btnDissabled}
          />
        </div>
      </div>
    </div>
  );
};

export default PostInput;
