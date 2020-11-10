import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import logoGeoBikeMobile from '../assets/geobike-mobile.png';
import logoGeoBikeDesktop from '../assets/geobike-desktop.png';
import Checkbox from './Checkbox';
import iconSearch from '../assets/icons/search.svg';
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
          className={styles.search}
          type="button"
          onClick={() => setSend(!send)}
        >
          <img src={iconSearch} alt="icon search" />
        </button>
      </div>
      <Checkbox
        handleChange={handleChange}
        bikesIsChecked={bikesIsChecked}
        standsIsChecked={standsIsChecked}
        bankingIsChecked={bankingIsChecked}
      />
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
