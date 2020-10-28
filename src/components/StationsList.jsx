import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';
import styles from '../css/stationsList.module.css';

const StationsList = ({ infos }) => {
  return (
    <div>
      <ul className={styles.main}>
        {infos.map((stations) => {
          return (
            <CardList
              key={stations.recordid}
              name={stations.fields.name}
              bike={stations.fields.available_bikes}
              stands={stations.fields.available_bike_stands}
              address={stations.fields.address}
              banking={stations.fields.banking}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StationsList;

StationsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  infos: PropTypes.array.isRequired,
};
