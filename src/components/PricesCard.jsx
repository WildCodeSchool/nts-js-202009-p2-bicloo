import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/PricesCard.module.css';

const PricesCard = ({ price }) => {
  const upperName =
    price.name.charAt(0).toUpperCase() + price.name.substring(1).toLowerCase();
  return (
    <div className={styles.pricesCard}>
      <li className={styles.card}>
        <h2 className={styles.titleCard}>
          {upperName === 'Mon bicloo pmr à assistance électrique'
            ? 'Mon bicloo PMR à assistance électrique'
            : upperName}
        </h2>
        <h3>
          {price.typeService.charAt(0).toUpperCase() +
            price.typeService.substring(1).toLowerCase()}
        </h3>
        <p>
          {price.libelle
            ? price.libelle.charAt(0).toUpperCase() +
              price.libelle.substring(1).toLowerCase()
            : ''}
        </p>
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
    libelle: PropTypes.string.isRequired,
    typeTarif: PropTypes.string.isRequired,
    montant: PropTypes.number.isRequired,
  }).isRequired,
};
