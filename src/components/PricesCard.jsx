import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/PricesCard.module.css';

const PricesCard = ({ price }) => {
  return (
    <div className={styles.pricesCard}>
      <li className={styles.card}>
        <h2 className={styles.titleCard}>
          {price.name.charAt(0).toUpperCase() +
            price.name.substring(1).toLowerCase()}
        </h2>
        <h3>
          {price.typeService.charAt(0).toUpperCase() +
            price.typeService.substring(1).toLowerCase()}
        </h3>
        <p>{price.libelle}</p>
        <p>
          {price.typeTarif.charAt(0).toUpperCase() +
            price.typeTarif.substring(1).toLowerCase()}
          : <b>{price.montant}€</b>
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
