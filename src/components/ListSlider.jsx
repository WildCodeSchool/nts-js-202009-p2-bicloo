import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';
import '../css/listSlider.css';

function ListSlider({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
  handleRoutingControl,
  display,
}) {
  return (
    <div className="container">
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
          return (
            <CardList
              key={station.id}
              station={station}
              handleRoutingControl={handleRoutingControl}
              display={display}
            />
          );
        })}
    </div>
  );
}

ListSlider.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleRoutingControl: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};

export default ListSlider;
