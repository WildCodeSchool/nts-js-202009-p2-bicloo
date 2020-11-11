import React, { Component } from 'react';
import axios from 'axios';

import PricesCard from './PricesCard';

import styles from '../css/PricesList.module.css';

class PricesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      onlyLong: false,
      onlyFree: false,
      onlyParking: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.showLong = this.showLong.bind(this);
    this.showFree = this.showFree.bind(this);
    this.showParking = this.showParking.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(
        'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_services-velos-bicloo-nantes-metropole-tarifs&q=&rows=1000&facet=type_de_service&facet=nom_du_service&facet=type_de_tarif&facet=montant&facet=libelle_tarif',
        {
          headers: {
            Authorization:
              'ApiKey c05f988c5637dd721c0c53db8abf952a3416a0ac0fa2cd535d82a521 ',
          },
        }
      )
      .then(({ data }) => {
        const prices = data.records.map((record) => {
          return {
            id: record.recordid,
            typeService: record.fields.type_de_service,
            name: record.fields.nom_du_service,
            libelle: record.fields.libelle_tarif,
            typeTarif: record.fields.type_de_tarif,
            montant: record.fields.montant,
          };
        });
        this.setState({ prices });
      });
  }

  showLong() {
    this.setState({
      onlyLong: true,
      onlyFree: false,
      onlyParking: false,
    });
  }

  showFree() {
    this.setState({
      onlyLong: false,
      onlyFree: true,
      onlyParking: false,
    });
  }

  showParking() {
    this.setState({
      onlyLong: false,
      onlyFree: false,
      onlyParking: true,
    });
  }

  showAll() {
    this.setState({
      onlyLong: true,
      onlyFree: true,
      onlyParking: true,
    });
  }

  render() {
    const { prices } = this.state;
    const { onlyLong } = this.state;
    const { onlyFree } = this.state;
    const { onlyParking } = this.state;

    return (
      <div className={styles.main}>
        <h1>Tarifs</h1>
        <button type="button" onClick={this.showAll}>
          Tout afficher
        </button>
        <button type="button" onClick={this.showLong}>
          Moyenne et longue durée
        </button>
        <button type="button" onClick={this.showFree}>
          Libre service
        </button>
        <button type="button" onClick={this.showParking}>
          Stationnement abrité
        </button>

        <ul>
          {prices
            .filter((rental) => {
              if (onlyLong && onlyFree && onlyParking) {
                return rental.typeService;
              } else if (onlyLong) {
                return (
                  rental.typeService ===
                  'location de vélo moyenne et longue durée'
                );
              } else if (onlyFree) {
                return rental.typeService === 'Vélo en libre service';
              } else if (onlyParking) {
                return rental.typeService === 'stationnement vélo abrité';
              } else {
                return rental.typeService;
              }
            })
            .map((price) => {
              return <PricesCard key={price.id} price={price} />;
            })}
        </ul>
      </div>
    );
  }
}

export default PricesList;
