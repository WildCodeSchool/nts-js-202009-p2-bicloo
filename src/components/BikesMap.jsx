import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import CardList from './CardList';

import styles from '../css/stationsList.module.css';
import '../css/bikesMap.css';

class BikesMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      coords: [47.214938, -1.556287],
      zoom: 13,
    };
    this.handleOnLocationFound = this.handleOnLocationFound.bind(this);
    this.handleOnLocationError = this.handleOnLocationError.bind(this);
  }

  componentDidMount() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true });
    map.on('locationfound', this.handleOnLocationFound);
    map.on('locationerror', this.handleOnLocationError);
  }

  handleOnLocationFound(e) {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;

    const { latlng } = e;
    const marker = L.marker(latlng);
    marker.addTo(map).bindPopup('Votre position ').openPopup();

    this.setState({ zoom: 17, coords: latlng });
  }

  handleOnLocationError() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: false });
  }

  render() {
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
    const { zoom, coords } = this.state;
    const { stations } = this.props;
    return (
      <div className={styles.mapBlock}>
        <Map ref={this.mapRef} center={coords} zoom={zoom}>
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={25}
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              icon={goldIcon}
              position={station.position}
            >
              <Popup className="card-popup">
                <CardList {...station} />
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

BikesMap.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BikesMap;
