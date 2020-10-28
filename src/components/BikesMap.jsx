import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import '../css/BikesMap.css';

class BikesMap extends Component {
  constructor() {
    super();
    this.mapRef = React.createRef();
    this.state = {
      lat: 47.232964,
      lng: -1.51134,
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
  }

  handleOnLocationError() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: false });
  }

  render() {
    const { zoom } = this.state;
    const { lat, lng } = this.state;
    const position = [lat, lng];
    return (
      <div>
        <Map ref={this.mapRef} center={position} zoom={zoom}>
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}

export default BikesMap;
