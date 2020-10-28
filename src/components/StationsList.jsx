import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

const StationsList = ({ stations }) => {
  return (
    <div>
      <ul>
        {stations.map((station) => {
          return (
            <CardList
              key={station.recordid}
              name={station.name}
              bike={station.availableBikes}
              stands={station.availableBikeStand}
              address={station.address}
              banking={station.banking}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StationsList;

StationsList.propTypes = {
  stations: PropTypes.array.isRequired,
};
