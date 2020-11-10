import React from 'react';
import PropTypes from 'prop-types';

const PricesCard = ({ prices }) => {
  return (
    <div>
      <li>
        <h2>{prices.name}></h2>
        <p>Annuel: 240€</p>
        <p>Annuel réduit: 192€</p>
        <p>Mensuel: 40€</p>
      </li>
    </div>
  );
};

export default PricesCard;
