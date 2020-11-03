import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const Header = ({ setCurrentAdress }) => {
  return (
    <header>
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
