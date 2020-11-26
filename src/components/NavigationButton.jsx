import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import iconBike from '../assets/icons/directions_bike.svg';
import credit from '../assets/icons/credit_card.svg';
import help from '../assets/icons/help.svg';

import styles from '../css/navigationButton.module.css';

function NavigationButton(props) {
  const [active, setActive] = useState(false);
  const { handlePopup } = props;

  return (
    <div className={styles.main} onClick={() => setActive(!active)}>
      <div
        className={`${styles.container} ${active && styles.containerActive}`}
      >
        <div
          className={`${styles.nav} ${
            active ? styles.navActive : styles.navDisabled
          }`}
        >
          <img
            onClick={handlePopup}
            className={styles.icon}
            src={help}
            alt="icon help"
          />
          <Link to="/prices">
            <img className={styles.icon} src={credit} alt="icon credit" />
          </Link>
          <Link to="/">
            <img className={styles.icon} src={iconBike} alt="icon search" />
          </Link>
        </div>
        <button
          className={`${styles.btn} ${
            active ? styles.btnActive : styles.btnDisabled
          }`}
          type="button"
        >
          <span className={styles.sliceCross} />
          <span className={styles.sliceCross} />
        </button>
      </div>
    </div>
  );
}

NavigationButton.propTypes = {
  handlePopup: PropTypes.func.isRequired,
};

export default NavigationButton;
