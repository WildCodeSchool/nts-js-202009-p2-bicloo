import React, { useState } from 'react';

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
          <p>tarifs</p>
          <p>rechercher</p>
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
