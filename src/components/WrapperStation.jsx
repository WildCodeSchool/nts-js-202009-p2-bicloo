import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import styles from '../css/WrapperStation.module.css';

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
        <button onClick={() => handleDisplay(true)} type="button">
          Map
        </button>
        <button onClick={() => handleDisplay(false)} type="button">
          List
        </button>
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
        <StationsList
          stations={stations}
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
