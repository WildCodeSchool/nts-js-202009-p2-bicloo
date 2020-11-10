import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

import styles from '../css/stationsList.module.css';

const StationsList = ({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
}) => {
  return (
    <div className={styles.stationBlock}>
      <ul className={styles.main}>
        {stations
          .filter((station) => {
            if (bankingIsChecked) {
              return station.banking === 'True';
            }
            return station;
          })
          .filter((station) => {
            if (bikesIsChecked) {
              return station.availableBikes > 0;
            }
            return station;
          })
          .filter((station) => {
            if (standsIsChecked) {
              return station.availableBikeStand > 0;
            }
            return station;
          })
          .map((station) => {
            return <CardList key={station.id} station={station} />;
          })}
      </ul>
    </div>
  );
};

export default StationsList;

StationsList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
};
