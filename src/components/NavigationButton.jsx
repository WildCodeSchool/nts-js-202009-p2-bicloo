import React, { useState } from 'react';

import more from '../assets/icons/more.svg';
import search from '../assets/icons/search.svg';
import credit from '../assets/icons/credit_card.svg';
import help from '../assets/icons/help.svg';

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
          <img className={styles.icon} src={help} alt="icon help" />
          <img className={styles.icon} src={credit} alt="icon credit" />
          <img className={styles.icon} src={search} alt="icon search" />
        </div>
        <button
          className={`${styles.btn} ${
            active ? styles.btnActive : styles.btnDisabled
          }`}
          onClick={() => setActive(!active)}
          type="button"
        >
          <img className={styles.icon} src={more} alt="icon more" />
        </button>
      </div>
    </div>
  );
}

export default NavigationButton;
