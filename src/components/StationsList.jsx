import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

const StationsList = ({ infos }) => {
  return (
    <div>
      <ul>
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
  infos: PropTypes.array.isRequired,
};
