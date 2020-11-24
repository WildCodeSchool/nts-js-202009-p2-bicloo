/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import langLocal from 'rc-pagination/es/locale/fr_FR';

import PricesCard from './PricesCard';

import logoGeoBikeMobile from '../assets/geobike-mobile.png';
import logoGeoBikeDesktop from '../assets/geobike-desktop.png';

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
      cursor: { currentPage: 1, start: 0, end: 9 },
      totale: 0,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.setcursor = this.setcursor.bind(this);
    this.settotale = this.settotale.bind(this);
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
      this.settotale();
    }

    if (prevState.onlyFree !== onlyFree) {
      this.handleSubscription('onlyFree', 'Vélo en libre service');
      this.settotale();
    }

    if (prevState.onlyParking !== onlyParking) {
      this.handleSubscription('onlyParking', 'stationnement vélo abrité');
      this.settotale();
    }
  }

  settotale() {
    const { all, subscriptions } = this.state;

    this.setState({ totale: all.length || subscriptions.length });
  }

  setcursor(current, pageSize) {
    this.setState({
      cursor: {
        currentPage: current,
        start: (current - 1) * pageSize,
        end: current * pageSize,
      },
    });
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
        this.settotale();
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
    const { subscriptions, all, cursor, totale } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <Link to="/">
            <picture>
              <source srcSet={logoGeoBikeDesktop} media="(min-width: 768px)" />
              <source srcSet={logoGeoBikeMobile} />
              <img
                className={styles.logo}
                src={logoGeoBikeMobile}
                alt="logo GeoBike"
              />
            </picture>
          </Link>
          <h1>Les Abonnements</h1>
          <div className={styles.checkbox}>
            <label htmlFor="long" className={styles.filters}>
              <input
                type="checkbox"
                name="onlyLong"
                onChange={this.handleCheckbox}
              />
              Moyenne et longue durée
            </label>
            <label htmlFor="free" className={styles.filters}>
              <input
                type="checkbox"
                name="onlyFree"
                onChange={this.handleCheckbox}
              />
              Libre service
            </label>
            <label htmlFor="parking" className={styles.filters}>
              <input
                type="checkbox"
                name="onlyParking"
                onChange={this.handleCheckbox}
              />
              Stationnement abrité
            </label>
          </div>
        </div>

        <Pagination
          className={styles.pagination}
          onChange={this.setcursor}
          current={cursor.currentPage}
          pageSize={9}
          total={totale}
          locale={langLocal}
        />

        <div>
          <ul>
            {all.length > 0
              ? all
                  .slice(cursor.start, cursor.end)
                  .map((price) => <PricesCard key={price.id} price={price} />)
              : subscriptions
                  .slice(cursor.start, cursor.end)
                  .map((price) => <PricesCard key={price.id} price={price} />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default PricesList;
