import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

import CardList from './CardList';

import styles from '../css/stationsList.module.css';
import '../css/bikesMap.css';

class BikesMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      coords: [47.214938, -1.556287],
      stationCoords: null,
      zoom: 13,
    };
    this.routingControl = null;
    this.handleOnLocationFound = this.handleOnLocationFound.bind(this);
    this.addRoutingControl = this.addRoutingControl.bind(this);
    this.removeRoutingControl = this.removeRoutingControl.bind(this);
    this.handleRoutingControl = this.handleRoutingControl.bind(this);
  }

  componentDidMount() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true });
    map.on('locationfound', this.handleOnLocationFound);
  }

  handleOnLocationFound(e) {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;

    const { latlng } = e;
    const marker = L.marker(latlng);
    marker.addTo(map).bindPopup('Votre position ').openPopup();

    this.setState({ zoom: 17, coords: latlng });
  }

  /*
    ajouter un itinéraire:
    je vérifie qu'il n'y a pas déjà un itinéraire
    si oui, j'appel removeRoutingCnotrol()
    sinon je le créer et l'ajoute à la carte
  */
  addRoutingControl(waypoints) {
    const { coords } = this.state;
    const { current } = this.mapRef;
    const { leafletElement: map } = current;

    if (this.routingControl != null) {
      this.removeRoutingControl();
    }
    this.routingControl = L.Routing.control({
      waypoints: [L.latLng(coords), L.latLng(waypoints)],
      lineOptions: {
        styles: [{ color: 'lightgreen', opacity: 1, weight: 5 }],
      },
    }).addTo(map);
  }

  /*
    supprimer un itinéraire:
    si routingControl n'est pas nul
    je supprime l'itinéraire
    et remet routingControl à nul
  */
  removeRoutingControl() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;

    if (this.routingControl != null) {
      map.removeControl(this.routingControl);
      this.routingControl = null;
    }
  }

  /*
    dans CardList, au click
    je créer un itinéraire
    entre ma position et la position de la station
  */
  handleRoutingControl(position) {
    const { stationCoords } = this.state;

    this.setState({ stationCoords: position }, () => {
      this.addRoutingControl(position);
    });
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
    const { bikesIsChecked, standsIsChecked, bankingIsChecked } = this.props;
    return (
      <div className={styles.mapBlock}>
        <Map ref={this.mapRef} center={coords} zoom={zoom}>
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={25}
          />
          {stations
            .filter((station) => {
              if (bankingIsChecked === true) {
                if (station.banking === 'True') {
                  return station;
                }
              } else {
                return station;
              }
              return '';
            })
            .filter((station) => {
              if (bikesIsChecked === true) {
                if (station.availableBikes > 0) {
                  return station;
                }
              } else {
                return station;
              }
              return '';
            })
            .filter((station) => {
              if (standsIsChecked === true) {
                if (station.availableBikeStand > 0) {
                  return station;
                }
              } else {
                return station;
              }
              return '';
            })
            .map((station) => (
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

          {stations.map((station) => (
            <Marker
              key={station.id}
              icon={goldIcon}
              position={station.position}
            >
              <Popup className="card-popup">
                <CardList
                  station={station}
                  handleRoutingControl={this.handleRoutingControl}
                />
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
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
};

export default BikesMap;
