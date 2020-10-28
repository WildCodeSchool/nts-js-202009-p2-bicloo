import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import StationList from './StationsList';

const WrapperStation = () => {
  const [dataStation, setdataStation] = useState([]);

  useEffect(() => {
    Axios.get(
      'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole-disponibilites&q=&rows=10&facet=banking&facet=bonus&facet=status&facet=contract_name'
    ).then((res) => {
      setdataStation(res.data.records);
    });
  }, []);

  return (
    <main>
      <StationList infos={dataStation} />
    </main>
  );
};

export default WrapperStation;
