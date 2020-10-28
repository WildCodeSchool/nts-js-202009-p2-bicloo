import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../css/BikesMap.css';

class BikesMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      lat: 47.232964,
      lng: -1.51134,
      zoom: 13,
      markers: [],
    };

    /* { position1: [47.228371, -1.523621] },
        { position1: [47.218371, -1.543621] },
        { position1: [47.248371, -1.513621] }, */

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
    const { zoom } = this.state;
    const { lat, lng } = this.state;
    const position = [lat, lng];
    const { markers } = this.state;
    return (
      <div>
        <Map ref={this.mapRef} center={position} zoom={zoom}>
          <TileLayer
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((localisation) => (
            <Marker icon={goldIcon} position={localisation.position1}>
              <Popup>
                <span>A test.</span>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default BikesMap;
