import React from 'react';
import CardList from './CardList';
import data from '../data.json';

const StationsList = () => {
  const infos = data.records;
  return (
    <div>
      <ul>
        {infos.map((stations) => {
          return (
            <CardList
              key={stations.recordid}
              name={stations.fields.name}
              bike={stations.fields.available_bikes}
              stands={stations.fields.available_bike_stands}
              address={stations.fields.address}
              banking={stations.fields.banking}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default StationsList;
