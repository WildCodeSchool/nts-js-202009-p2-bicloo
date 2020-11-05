import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../css/SearchBar.module.css';
import iconLocation from '../assets/icons/location.svg';

const SearchBar = ({ setStateAddress, placeholder, send }) => {
  const [value, setvalue] = useState('');
  const [keydown, setKeyDown] = useState(false);
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

  /** Cycle de vie: quand le state 'value' change je fais une requête */
  useEffect(() => {
    if (value.length > 0) {
      fetchAddress();
    }
  }, [keydown]);

  /** Je met a jour le state d'adresse de départ ou
   * d'arriver qui est dans le composant App
   * avec un callback passer en props
   */
  useEffect(() => {
    setStateAddress(infoAddress);
  }, [send]);

  /** Ici je récupère l'address selectionné */
  const selectAddress = (e) => {
    const addressCliked = e.target.textContent;
    const currentAdress = allAddress.find(
      (element) => element.address === value
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
            allAddress.length ? styles.contains : ''
          }`}
          placeholder={placeholder}
          onKeyDown={() => setKeyDown(!keydown)}
          onChange={(e) => handleInput(e)}
          value={value}
        />
      </div>
      {allAddress.length > 0 && (
        <ul className={styles.list}>
          {allAddress.map((data) => (
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
