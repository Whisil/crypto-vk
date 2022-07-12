import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';

import styles from './styles.module.scss';

interface Props {
  children: any;
  className?: string;
  variant?: 'accent';
}

const RippleBtn = ({ children, className, variant }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [bubbleAnim, setBubbleAnim] = useState(false);

  const btnRef = useRef<HTMLDivElement>(null);

  const handleRipple = (e: any) => {
    setTop(e.clientY - e.target.getBoundingClientRect().top);
    setLeft(e.clientX - e.target.getBoundingClientRect().left);
    setClicked((val) => !val);
  };

  useEffect(() => {
    if (btnRef.current) {
      const bubble = document.createElement(`div`);
      bubble.classList.add(styles.bubble, `${bubbleAnim && styles.bubbleAnim}`);
      bubble.style.top = top + `px`;
      bubble.style.left = left + `px`;
      btnRef.current.appendChild(bubble);
      setTimeout(() => {
        btnRef?.current?.removeChild(bubble);
      }, 401);
    }
  }, [clicked]);

  return (
    <div
      className={classNames(
        styles.rippleBtn,
        className,
        variant?.length != 0 && styles.rippleAccent,
      )}
      onClick={handleRipple}
      ref={btnRef}
      onMouseOver={() => setBubbleAnim(true)}
      onMouseLeave={() => setBubbleAnim(false)}
    >
      {children}
    </div>
  );
};

export default RippleBtn;
