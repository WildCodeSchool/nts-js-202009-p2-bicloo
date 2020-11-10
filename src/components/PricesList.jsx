import React, { Component } from 'react';
import axios from 'axios';

import PricesCard from './PricesCard';

import styles from '../css/PricesList.module.css';

class PricesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    };
    this.fetchData = this.fetchData.bind(this);
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

  render() {
    const { prices } = this.state;
    return (
      <div className={styles.main}>
        <h1>Tarifs</h1>
        <ul>
          {prices.map((price) => {
            return <PricesCard key={price.id} price={price} />;
          })}
        </ul>
      </div>
    );
  }
}

export default PricesList;
