import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
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
  }

  render() {
    const { zoom } = this.state;
    const { lat, lng } = this.state;
    const position = [lat, lng];
    return (
      <div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.209561, -1.572541]} />
        </Map>
      </div>
    );
  }
}

export default BikesMap;
