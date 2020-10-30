import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import styles from '../css/WrapperStation.module.css';

const WrapperStation = ({ stations }) => {
  const [display, setdisplay] = useState(true);

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
      {display ? (
        <BikesMap stations={stations} />
      ) : (
        <StationsList stations={stations} />
      )}

      <div className={styles.desktop}>
        <BikesMap stations={stations} />
        <StationsList stations={stations} />
      </div>
    </main>
  );
};

export default WrapperStation;

WrapperStation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  stations: PropTypes.array.isRequired,
};
