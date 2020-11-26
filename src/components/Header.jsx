import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import Checkbox from './Checkbox';

import logoGeoBikeMobile from '../assets/geobike-mobile.png';
import logoGeoBikeDesktop from '../assets/geobike-desktop.png';
import iconBike from '../assets/icons/directions_bike.svg';
import iconSetting from '../assets/icons/setting.svg';

import styles from '../css/Header.module.css';

const Header = ({
  setCurrentAdress,
  setArrivalAddress,
  handleChange,
  bikesIsChecked,
  bankingIsChecked,
  standsIsChecked,
}) => {
  const [send, setSend] = useState(false);
  const [isSetting, setisSetting] = useState(false);

  return (
    <header className={styles.wrapperHeader}>
      <picture>
        <source srcSet={logoGeoBikeDesktop} media="(min-width: 768px)" />
        <source srcSet={logoGeoBikeMobile} />
        <img
          className={styles.logo}
          src={logoGeoBikeMobile}
          alt="logo GeoBike"
        />
      </picture>
      <div className={styles.wrapperSearchCheckbox}>
        <div className={styles.wrapperSearch}>
          <SearchBar
            placeholder="Départ - autour de moi"
            setStateAddress={(currAddress) => setCurrentAdress(currAddress)}
            send={send}
          />
          <SearchBar
            placeholder="Arrivée"
            setStateAddress={(arrAddress) => setArrivalAddress(arrAddress)}
            send={send}
          />
          <button
            className={styles.setting}
            type="button"
            onClick={() => setisSetting(!isSetting)}
          >
            <img src={iconSetting} alt="icon setting" />
          </button>
          <button
            className={styles.search}
            type="button"
            onClick={() => setSend(!send)}
          >
            <img src={iconBike} alt="icon search" />
          </button>
        </div>

        <Checkbox
          isSetting={isSetting}
          handleChange={handleChange}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  setCurrentAdress: PropTypes.func.isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  setArrivalAddress: PropTypes.func.isRequired,
};

export default Header;
