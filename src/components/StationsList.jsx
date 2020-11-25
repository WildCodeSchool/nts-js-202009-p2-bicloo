import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import langLocal from 'rc-pagination/es/locale/fr_FR';

import CardList from './CardList';

import styles from '../css/stationsList.module.css';

const StationsList = ({
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  stations,
  display,
}) => {
  const [totale, settotale] = useState(0);
  const [cursor, setcursor] = useState({ currentPage: 1, start: 0, end: 9 });
  const [allStations, setallStations] = useState(stations);

  // Filtres des stations
  const filteredStation = () => {
    const stationFiltered = stations
      .filter((station) =>
        bankingIsChecked ? station.banking === 'True' : station
      )
      .filter((station) =>
        bikesIsChecked ? station.availableBikes > 0 : station
      )
      .filter((station) =>
        standsIsChecked ? station.availableBikeStand > 0 : station
      );

    setallStations(stationFiltered);

    return stationFiltered;
  };

  useEffect(() => {
    const stationFiltered = filteredStation();

    settotale(stationFiltered.length);
    setcursor({ currentPage: 1, start: 0, end: 9 });
  }, [bikesIsChecked, standsIsChecked, bankingIsChecked]);

  // Mise à jour de la page sélectionnée
  const handlePagination = (current, pageSize) => {
    setcursor({
      currentPage: current,
      start: (current - 1) * pageSize,
      end: current * pageSize,
    });
  };

  const { currentPage, start, end } = cursor;

  return (
    <div className={`${styles.stationBlock} ${display && styles.display}`}>
      <ul className={styles.main}>
        <Pagination
          className={styles.pagination}
          onChange={handlePagination}
          current={currentPage}
          pageSize={9}
          total={totale}
          locale={langLocal}
          style={{ marginTop: '1rem' }}
        />
        {allStations.slice(start, end).map((station) => {
          return (
            <CardList key={station.id} station={station} display={display} />
          );
        })}
      </ul>
    </div>
  );
};

export default StationsList;

StationsList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  display: PropTypes.bool.isRequired,
};
