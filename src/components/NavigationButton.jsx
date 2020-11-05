import React, { useState } from 'react';

import styles from '../css/navigationButton.module.css';

function NavigationButton() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.wrapperButton}>
      <button
        className={`${styles.btn} ${
          active ? styles.btnActive : styles.btnDisabled
        }`}
        onClick={() => setActive(!active)}
        type="button"
      >
        +
        <div
          className={`${styles.container} ${
            active ? styles.containerActive : styles.containerDisabled
          }`}
        >
          <p>rechercher</p>
          <p>tarifs</p>
          <p>contacts</p>
        </div>
      </button>
    </div>
  );
}

export default NavigationButton;
