import { useState } from 'react';

import styles from './styles.module.scss';

const Search = () => {
  const [border, setBorder] = useState(false);

  return (
    <label
      htmlFor="search"
      className={styles.label}
      style={border ? { border: `2px solid #1CA1EF` } : {}}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.963 18.9978L13.8035 13.8104M15.9864 8.52328C15.9864 10.003 15.55 11.4496 14.7323 12.6799C13.9146 13.9103 12.7524 14.8693 11.3926 15.4355C10.0328 16.0018 8.53658 16.15 7.09306 15.8613C5.64954 15.5726 4.32358 14.86 3.28286 13.8137C2.24214 12.7674 1.5334 11.4342 1.24626 9.9829C0.959128 8.53158 1.1065 7.02725 1.66973 5.66013C2.23296 4.29301 3.18677 3.12452 4.41053 2.30241C5.63428 1.4803 7.07303 1.0415 8.54484 1.0415C10.5185 1.0415 12.4112 1.82976 13.8068 3.23287C15.2024 4.63597 15.9864 6.53899 15.9864 8.52328Z"
          stroke="#69757E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Explore"
        autoComplete="off"
        className={styles.input}
        onFocus={() => setBorder(true)}
        onBlur={() => setBorder(false)}
      />
    </label>
  );
};

export default Search;
