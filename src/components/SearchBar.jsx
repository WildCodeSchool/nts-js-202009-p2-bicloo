import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../css/SearchBar.module.css';

import iconLocation from '../assets/icons/location.svg';

const SearchBar = ({ setStateAddress, placeholder, send }) => {
  const [value, setvalue] = useState('');
  const [allAddress, setallAddress] = useState([]);
  const [infoAddress, setinfoAddress] = useState([]);

  /** Ici je recupère toutes les valeurs que
   * l'utilisateur entre dans notre champ avec une fonction asynchrone
   *  pour ne perdre aucune valeur.
   */
  const handleInput = async (e) => {
    await setvalue(e.target.value);
  };

  /** Je fais une requête pour rechercher une adresse
   * et j'annule la requête precedente si elle n'est pas terminer et
   * qu'il y en a une nouvelle.
   */
  let cancelToken;

  const fetchAddress = () => {
    cancelToken = Axios.CancelToken.source();

    Axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${value}&type=housenumber&autocomplete=1`,
      {
        header: {
          'Access-Control-Allow-Origin': 'https://api-adresse.data.gouv.fr',
          'Content-Type': 'application/json',
        },
        cancelToken: cancelToken.token,
      }
    )
      .then((res) => {
        const data = res.data.features.map((client) => {
          return {
            id: client.properties.id,
            coordinnates: [client.geometry.coordinates],
            address: client.properties.label,
          };
        });

        setallAddress(data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  /** On limite les requêtes a 10 par secondes au bout de une seconde
   *  on remet les compteurs a zero.
   */
  const [currentToken, setcurrentToken] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setcurrentToken(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentToken]);

  /** Cycle de vie: quand le state 'value' change je fais une requête */
  useEffect(() => {
    setcurrentToken((token) => token + 1);

    const address = infoAddress && infoAddress.address;

    if (value.length > 0 && currentToken < 10 && address !== value) {
      fetchAddress();
    }
  }, [value]);

  /** Je met a jour le state d'adresse de départ ou
   * d'arriver qui est dans le composant App
   * avec un callback passer en props
   */
  const setAddress = useCallback((address) => setStateAddress(address), [
    setStateAddress,
  ]);

  useEffect(() => {
    setAddress(infoAddress);
  }, [send]);

  /** Ici je récupère l'address selectionné */
  const selectAddress = (e) => {
    const addressCliked = e.target.textContent;
    const currentAdress = allAddress.find(
      (element) => element.address === addressCliked
    );

    setvalue(addressCliked); // valeur mit a jour dans l'Input
    setinfoAddress(currentAdress); // je récupère toutes les infos de l'adresse selectionné
    setallAddress([]); // je vide la liste
  };

  return (
    <div className={styles.containerSearchBar}>
      <div className={styles.wrapperInput}>
        <img
          className={styles.iconInput}
          src={iconLocation}
          alt="icon location"
        />
        <input
          type="text"
          className={`${styles.input} ${
            allAddress.length && value ? styles.contains : ''
          }`}
          placeholder={placeholder}
          onChange={(e) => handleInput(e)}
          value={value}
        />
      </div>
      {value && allAddress.length > 0 && (
        <ul className={styles.list}>
          {allAddress.map((data) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={data.id}
              className={styles.listItem}
              onClick={(e) => selectAddress(e)}
            >
              {data.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  send: PropTypes.bool.isRequired,
  setStateAddress: PropTypes.func.isRequired,
};
