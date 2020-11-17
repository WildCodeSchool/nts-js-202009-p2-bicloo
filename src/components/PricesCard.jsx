import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/PricesCard.module.css';

const PricesCard = ({ price }) => {
  return (
    <div className={styles.pricesCard}>
      <li className={styles.card}>
        <h2>{price.name}</h2>
        <h3>{price.typeService}</h3>
        <p>{price.libelle}</p>
        <p>
          {price.typeTarif}: <b>{price.montant}€</b>
        </p>
      </li>
    </div>
  );
};

export default PricesCard;

PricesCard.propTypes = {
  price: PropTypes.shape({
    typeService: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    libelle: PropTypes.string,
    typeTarif: PropTypes.string.isRequired,
    montant: PropTypes.number.isRequired,
  }).isRequired,
};
