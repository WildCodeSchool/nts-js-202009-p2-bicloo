import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

const StationsList = ({ stations }) => {
  return (
    <div>
      <ul>
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
