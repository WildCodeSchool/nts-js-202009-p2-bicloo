import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';

import styles from '../css/stationsList.module.css';

const CardList = ({ station, handleRoutingControl, display }) => {
  const { width } = useWindowSize();

  return (
    <>
      {station && (
        <li className={styles.listStation}>
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
            {(width > 768 || !display) && (
              <button
                type="button"
                className={styles.button}
                onClick={() =>
                  !display && handleRoutingControl(station.position)
                }
              >
                Itinéraire
              </button>
            )}
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
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  handleRoutingControl: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};
