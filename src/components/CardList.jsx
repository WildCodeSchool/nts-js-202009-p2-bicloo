import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/stationsList.module.css';

const CardList = ({ station, handleItinerary }) => {
  return (
    <>
      {station && (
        <li className={styles.list}>
          <div className={styles.infos}>
            <h2 className={styles.name}>
              {station.name.substr(station.name.lastIndexOf('-') + 1)}
            </h2>
            <p>
              Velos disponibles:
              {'  '}
              <b>{station.availableBikes}</b>
            </p>
            <p>
              Places disponibles:
              {'  '}
              <b>{station.availableBikeStand}</b>
            </p>
            <p>
              Adresse:
              {'  '}
              <b>{station.address}</b>
            </p>
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.button}
              onClick={() => handleItinerary(station.position)}
            >
              Itinéraire
            </button>
            <p
              className={
                station.banking === 'False' ? styles.banking : styles.notBanking
              }
            >
              {station.banking === 'True' ? 'Avec borne' : 'Sans borne'}
            </p>
          </div>
        </li>
      )}
    </>
  );
};

export default CardList;

CardList.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    availableBikeStand: PropTypes.number.isRequired,
    availableBikes: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    banking: PropTypes.string.isRequired,
  }).isRequired,
  handleItinerary: PropTypes.func.isRequired,
};
