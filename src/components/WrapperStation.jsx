import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';
import L from 'leaflet';
import 'leaflet-routing-machine';

import ListSlider from './ListSlider';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import Button from './Button';
import logoMap from '../assets/icons/map.svg';
import logoList from '../assets/icons/list.svg';
import styles from '../css/WrapperStation.module.css';
import buttonStyles from '../css/Button.module.css';

const WrapperStation = ({
  stations,
  bikesIsChecked,
  standsIsChecked,
  bankingIsChecked,
  currentAddress,
  arrivalAddress,
}) => {
  const [display, setDisplay] = useState(false);
  const [defaultMarker, setDefaultMarker] = useState(true);
  const [coords, setCoords] = useState([47.214938, -1.556287]);
  const [stationCoords, setstationCoords] = useState(null);

  const { width } = useWindowSize();
  const mapRef = useRef();
  const zoom = 13;
  let marker = null;
  let routingControl = null;

  const handleDisplay = () => {
    setDisplay(!display);
  };

  const handleOnLocationFound = (e) => {
    const { current } = mapRef;
    const { leafletElement: map } = current;

    const { latlng } = e;
    marker = L.marker(latlng);
    marker.addTo(map);
    setCoords(latlng);
  };

  /*
    supprimer un itinéraire:
    si routingControl n'est pas nul
    je supprime l'itinéraire
    et remet routingControl à nul
  */
  const removeRoutingControl = () => {
    const { current } = mapRef;
    const { leafletElement: map } = current;

    if (routingControl) {
      map.removeControl(routingControl);
      routingControl = null;
    }
  };

  /*
    ajouter un itinéraire:
    je vérifie qu'il n'y a pas déjà un itinéraire
    si oui, j'appel removeRoutingCnotrol()
    sinon je le créer et l'ajoute à la carte
  */
  const addRoutingControl = (waypoints) => {
    const { current } = mapRef;
    const { leafletElement: map } = current;

    if (!defaultMarker) {
      routingControl = L.Routing.control({
        router: L.Routing.mapbox(
          'pk.eyJ1IjoibmljaG9sYXM1NzAiLCJhIjoiY2tobmw2a2k5MGR0ZDMyazYzbzVlMnhjYSJ9.8LJlSXnrtqJ272s_oWU_2Q'
        ),
        waypoints: [L.latLng(coords), L.latLng(waypoints)],
        lineOptions: {
          styles: [{ color: '#669df6', opacity: 1, weight: 5 }],
        },
      }).addTo(map);
    } else {
      setDefaultMarker(false);
    }
  };

  /*
    dans CardList, au click
    je créer un itinéraire
    entre ma position et la position de la station
  */
  const handleRoutingControl = (position) => {
    setstationCoords(position);
  };

  useEffect(() => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true });
    map.on('locationfound', handleOnLocationFound);
  }, []);

  useEffect(() => {
    addRoutingControl(stationCoords);

    return () => {
      removeRoutingControl();
    };
  }, [stationCoords, coords]);

  useEffect(() => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    if (currentAddress) {
      setCoords(currentAddress);
    }
    return () => {
      if (marker) map.removeLayer(marker);
    };
  }, [currentAddress]);

  useEffect(() => {
    if (arrivalAddress) {
      setstationCoords(arrivalAddress);
    }
  }, [arrivalAddress]);

  return (
    <main>
      <nav className={styles.nav}>
        <Button
          value="Carte"
          logo={logoMap}
          className={
            display ? buttonStyles.buttonDisable : buttonStyles.buttonActive
          }
          handleDisplay={handleDisplay}
        />
        <Button
          value="Liste"
          logo={logoList}
          className={
            display ? buttonStyles.buttonActive : buttonStyles.buttonDisable
          }
          handleDisplay={handleDisplay}
        />
      </nav>
      <BikesMap
        ref={mapRef}
        zoom={zoom}
        coords={coords}
        stations={stations}
        bikesIsChecked={bikesIsChecked}
        standsIsChecked={standsIsChecked}
        bankingIsChecked={bankingIsChecked}
        handleRoutingControl={handleRoutingControl}
        display={display}
      />
      {width < 768 ? (
        <StationsList
          stations={stations}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          display={display}
        />
      ) : (
        <ListSlider
          stations={stations}
          display={display}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          handleRoutingControl={handleRoutingControl}
        />
      )}
    </main>
  );
};

export default WrapperStation;

WrapperStation.defaultProps = {
  currentAddress: '',
  arrivalAddress: '',
};

WrapperStation.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  currentAddress: PropTypes.arrayOf(PropTypes.object),
  arrivalAddress: PropTypes.arrayOf(PropTypes.object),
};
