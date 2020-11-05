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
            if (bankingIsChecked === true) {
              if (station.banking === 'True') {
                return station;
              }
            } else {
              return station;
            }
            return '';
          })
          .filter((station) => {
            if (bikesIsChecked === true) {
              if (station.availableBikes > 0) {
                return station;
              }
            } else {
              return station;
            }
            return '';
          })
          .filter((station) => {
            if (standsIsChecked === true) {
              if (station.availableBikeStand > 0) {
                return station;
              }
            } else {
              return station;
            }
            return '';
          })
          .map((station) => {
            return <CardList key={station.id} {...station} />;
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
