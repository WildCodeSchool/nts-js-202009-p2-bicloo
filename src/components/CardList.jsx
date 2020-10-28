import React from 'react';
import PropTypes from 'prop-types';

const CardList = ({
  name,
  availableBikeStand,
  availableBikes,
  address,
  banking,
}) => {
  return (
    <li>
      <h2>{name}</h2>
      <p>
        Velos disponibles:
        {availableBikes}
      </p>
      <p>
        Places disponibles:
        {availableBikeStand}
      </p>
      <p>
        Adresse:
        {address}
      </p>
      <button type="button">Itinéraire</button>
      <p>{banking === 'True' ? 'Avec bornes' : 'Sans bornes'}</p>
    </li>
  );
};
export default CardList;

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  availableBikeStand: PropTypes.number.isRequired,
  availableBikes: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  banking: PropTypes.string.isRequired,
};
