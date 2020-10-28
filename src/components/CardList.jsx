import React from 'react';
import PropTypes from 'prop-types';

const CardList = ({ station }) => {
  console.log(station);
  return (
    <li>
      <h2>{station.name}</h2>
      <p>
        Velos disponibles:
        {station.bike}
      </p>
      <p>
        Places disponibles:
        {station.stands}
      </p>
      <p>
        Adresse:
        {station.address}
      </p>
      <button type="button">Itinéraire</button>
      <p>{station.banking === 'True' ? 'Avec bornes' : 'Sans bornes'}</p>
    </li>
  );
};
export default CardList;

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  bike: PropTypes.number.isRequired,
  stands: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  banking: PropTypes.string.isRequired,
};
