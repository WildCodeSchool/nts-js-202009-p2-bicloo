import React from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

import CardList from './CardList';

import styles from '../css/stationsList.module.css';
import '../css/BikesMap.css';

const BikesMap = React.forwardRef((props, ref) => {
  const goldIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const {
    coords,
    zoom,
    bikesIsChecked,
    standsIsChecked,
    bankingIsChecked,
    stations,
    handleRoutingControl,
    display,
  } = props;

  return (
    <div className={styles.mapBlock}>
      <Map ref={ref} center={coords} zoom={zoom}>
        <TileLayer
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={25}
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
          .map((station) => (
            <Marker
              key={station.id}
              icon={goldIcon}
              position={station.position}
            >
              <Popup className="card-popup">
                <CardList
                  station={station}
                  handleRoutingControl={handleRoutingControl}
                  display={display}
                />
              </Popup>
            </Marker>
          ))}
      </Map>
    </div>
  );
});

BikesMap.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  display: PropTypes.bool.isRequired,
  handleRoutingControl: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BikesMap;
