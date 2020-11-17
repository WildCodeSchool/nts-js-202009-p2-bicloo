/* eslint-disable no-else-return */
import React, { Component } from 'react';
import axios from 'axios';
import PricesCard from './PricesCard';
import styles from '../css/PricesList.module.css';

class PricesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      onlyLong: false,
      onlyFree: false,
      onlyParking: false,
      all: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProp, prevState) {
    const { onlyLong, onlyFree, onlyParking } = this.state;
    if (prevState.onlyLong !== onlyLong) {
      this.handleSubscription(
        'onlyLong',
        'location de vélo moyenne et longue durée'
      );
    }

    if (prevState.onlyFree !== onlyFree) {
      this.handleSubscription('onlyFree', 'Vélo en libre service');
    }

    if (prevState.onlyParking !== onlyParking) {
      this.handleSubscription('onlyParking', 'stationnement vélo abrité');
    }
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
        const subscriptions = data.records.map((record) => {
          return {
            id: record.recordid,
            typeService: record.fields.type_de_service,
            name: record.fields.nom_du_service,
            libelle: record.fields.libelle_tarif,
            typeTarif: record.fields.type_de_tarif,
            montant: record.fields.montant,
          };
        });
        this.setState({ subscriptions });
      });
  }

  handleSubscription(nameCheckbox, type) {
    const { subscriptions, all, [nameCheckbox]: checkbox } = this.state;

    const filtered = subscriptions.filter((rental) => {
      if (checkbox) {
        return rental.typeService === type;
      }
    });

    const clearAll = all.filter((price) => {
      if (!checkbox) {
        return price.typeService !== type;
      }

      return true;
    });

    this.setState({
      all: [...clearAll, ...filtered],
    });
  }

  handleCheckbox(e) {
    const { name, checked } = e.target;

    this.setState({ [name]: checked });
  }

  render() {
    const { subscriptions, all } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Les prix</h1>
          <label htmlFor="long">
            <input
              type="checkbox"
              name="onlyLong"
              onChange={this.handleCheckbox}
            />
            Moyenne et longue durée
          </label>
          <label htmlFor="free">
            <input
              type="checkbox"
              name="onlyFree"
              onChange={this.handleCheckbox}
            />
            Libre service
          </label>
          <label htmlFor="parking">
            <input
              type="checkbox"
              name="onlyParking"
              onChange={this.handleCheckbox}
            />
            Stationnement abrité
          </label>
        </div>

        <div>
          <ul>
            {all.length > 0
              ? all.map((price) => <PricesCard key={price.id} price={price} />)
              : subscriptions.map((price) => (
                  // eslint-disable-next-line react/jsx-indent
                  <PricesCard key={price.id} price={price} />
                ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PricesList;
