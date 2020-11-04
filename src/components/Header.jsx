import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

const Header = (props) => {
  const {
    handleChange,
    bikesIsChecked,
    standsIsChecked,
    bankingIsChecked,
  } = props;
  return (
    <header>
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
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Header;
