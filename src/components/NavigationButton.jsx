import React, { useState } from 'react';

import search from '../assets/icons/search.svg';
import credit from '../assets/icons/credit_card.svg';

import styles from '../css/navigationButton.module.css';

function NavigationButton() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.main}>
      <div
        className={`${styles.container} ${active && styles.containerActive}`}
      >
        <div
          className={`${styles.nav} ${
            active ? styles.navActive : styles.navDisabled
          }`}
        >
          <p>contacts</p>
          <img src={credit} alt="icon credit" />
          <img src={search} alt="icon search" />
        </div>
        <button
          className={`${styles.btn} ${
            active ? styles.btnActive : styles.btnDisabled
          }`}
          onClick={() => setActive(!active)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NavigationButton;
