import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';
import styles from '../css/stationsList.module.css';

const StationsList = ({ stations }) => {
  return (
    <div>
      <ul className={styles.main}>
        {stations.map((station) => {
          return <CardList key={station.id} {...station} />;
        })}
      </ul>
    </div>
  );
};

export default StationsList;

StationsList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
