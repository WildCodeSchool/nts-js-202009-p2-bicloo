import React, { useState, useEffect, useContext } from 'react';

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
  const [cursor, setcursor] = useState({ currentPage: 1, start: 0, end: 6 });

  useEffect(() => {
    settotale(stations.length);
  }, []);

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
          pageSize={6}
          total={totale}
          locale={langLocal}
        />
        {stations
          .filter((station) => {
            if (bankingIsChecked) {
              return station.banking === 'True';
            }
            return station;
          })
          .filter((station) => {
            if (bikesIsChecked) {
              return station.availableBikes > 0;
            }
            return station;
          })
          .filter((station) => {
            if (standsIsChecked) {
              return station.availableBikeStand > 0;
            }
            return station;
          })
          .slice(start, end)
          .map((station) => {
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
