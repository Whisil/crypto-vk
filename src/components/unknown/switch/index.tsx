import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

interface SwitchProps {
  variant: 'theme-switch';
}

const Switch = ({ variant }: SwitchProps) => {
  const [switchActive, setSwitchActive] = useState(false);

  const switchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (variant === `theme-switch`) {
      setSwitchActive(JSON.parse(localStorage.getItem(`themeVariant`) || `{}`));
    }
  }, []);

  const handleChange = (e: any) => {
    if (switchRef && switchRef.current) {
      setSwitchActive(switchRef.current.checked);

      if (variant === `theme-switch`) {
        localStorage.setItem(`themeVariant`, JSON.stringify(e.target.checked));
      }
    }
  };

  return (
    <label
      className={classNames(styles.switch, switchActive && styles.switchActive)}
    >
      <input
        type="checkbox"
        className={styles.switchInput}
        onChange={handleChange}
        ref={switchRef}
        checked={switchActive}
      />
      <span className={styles.switchCircle} />
      <div className={styles.switchText}>
        <span className={styles.onText}>ON</span>
        <span className={styles.offText}>OFF</span>
      </div>
    </label>
  );
};

export default Switch;
