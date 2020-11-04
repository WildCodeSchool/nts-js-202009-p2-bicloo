import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import logoGeoBike from '../assets/geobike-mobile.png';
import styles from '../css/Header.module.css';

const Header = ({ setCurrentAdress }) => {
  return (
    <header className={styles.wrapperHeader}>
      <img className={styles.logo} src={logoGeoBike} alt="logo GeoBike" />
      <SearchBar
        setCurrentAdress={(currAddress) => setCurrentAdress(currAddress)}
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  setCurrentAdress: PropTypes.func.isRequired,
};
