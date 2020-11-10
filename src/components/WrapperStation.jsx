import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';

import ListSlider from './ListSlider';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import Button from './Button';
import logoMap from '../assets/icons/map.svg';
import logoList from '../assets/icons/list.svg';
import styles from '../css/WrapperStation.module.css';
import buttonStyles from '../css/Button.module.css';

const WrapperStation = ({
  stations,
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
}) => {
  const [display, setdisplay] = useState(true);
  const { width } = useWindowSize();

  const handleDisplay = (bool) => {
    setdisplay(bool);
  };

  return (
    <main>
      <nav className={styles.nav}>
        <Button
          value="Carte"
          logo={logoMap}
          className={
            display ? buttonStyles.buttonActive : buttonStyles.buttonDisable
          }
          handleDisplay={() => handleDisplay(true)}
        />
        <Button
          value="Liste"
          logo={logoList}
          className={
            display ? buttonStyles.buttonDisable : buttonStyles.buttonActive
          }
          handleDisplay={() => handleDisplay(false)}
        />
      </nav>
      {display && width < 768 ? (
        <BikesMap
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
      ) : (
        <StationsList
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
      )}

      <div className={styles.desktop}>
        <BikesMap
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
        <ListSlider
          stations={stations}
          display={display}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
      </div>
    </main>
  );
};

export default WrapperStation;

WrapperStation.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
};
