import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import logoGeoBike from '../assets/geobike-mobile.png';
import iconSearch from '../assets/icons/search.svg';
import styles from '../css/Header.module.css';

const Header = ({ setCurrentAdress, setArrivalAddress }) => {
  const [send, setSend] = useState(false);

  return (
    <header className={styles.wrapperHeader}>
      <img className={styles.logo} src={logoGeoBike} alt="logo GeoBike" />
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
    </header>
  );
};

export default Header;

Header.propTypes = {
  setCurrentAdress: PropTypes.func.isRequired,
  setArrivalAddress: PropTypes.func.isRequired,
};
