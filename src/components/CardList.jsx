import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/stationsList.module.css';

const CardList = ({
  name,
  availableBikeStand,
  availableBikes,
  address,
  banking,
}) => {
  return (
    <li className={styles.list}>
      <div className={styles.infos}>
        <h2 className={styles.name}>{name}</h2>
        <p>
          Velos disponibles:
          {'  '}
          <b>{availableBikes}</b>
        </p>
        <p>
          Places disponibles:
          {'  '}
          <b>{availableBikeStand}</b>
        </p>
        <p>
          Adresse:
          {'  '}
          <b>{address}</b>
        </p>
      </div>
      <div className={styles.buttons}>
        <button type="button" className={styles.button}>
          Itinéraire
        </button>
        <p className={styles.banking}>
          {banking === 'True' ? 'Avec bornes' : 'Sans bornes'}
        </p>
      </div>
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
