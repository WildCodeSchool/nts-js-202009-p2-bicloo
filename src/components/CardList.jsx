import React from 'react';
const CardList = ({ name, bike, stands, address, banking }) => {
  return (
    <li>
      <h2>{name}</h2>
      <p>Velos disponibles: {bike}</p>
      <p>Places disponibles: {stands}</p>
      <p>Adresse: {address}</p>
      <button type="button">Itinéraire</button>
      <p>{banking === 'True' ? 'Avec bornes' : 'Sans bornes'}</p>
    </li>
  );
};
export default CardList;
