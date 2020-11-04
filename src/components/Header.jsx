import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import logoGeoBike from '../assets/geobike-mobile.png';
import Checkbox from './Checkbox';
import styles from '../css/Header.module.css';

const Header = (props, { setCurrentAdress }) => {
  const {
    handleChange,
    bikesIsChecked,
    standsIsChecked,
    bankingIsChecked,
  } = props;
  return (
    <header className={styles.wrapperHeader}>
      <img className={styles.logo} src={logoGeoBike} alt="logo GeoBike" />
      <SearchBar
        setCurrentAdress={(currAddress) => setCurrentAdress(currAddress)}
      />
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
};

export default Header;
