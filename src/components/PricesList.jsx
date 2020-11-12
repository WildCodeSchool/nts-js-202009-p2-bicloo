/* eslint-disable no-else-return */
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
      all: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.showLong = this.showLong.bind(this);
    this.showFree = this.showFree.bind(this);
    this.showParking = this.showParking.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProp, prevState) {
    const { onlyLong, onlyFree, onlyParking } = this.state;
    if (prevState.onlyLong !== onlyLong) {
      this.showLong();
    }

    if (prevState.onlyFree !== onlyFree) {
      this.showFree();
    }

    if (prevState.onlyParking !== onlyParking) {
      this.showParking();
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
    const { onlyLong, prices, all } = this.state;
    const long = prices.filter((rental) => {
      if (onlyLong) {
        return (
          rental.typeService === 'location de vélo moyenne et longue durée'
        );
      }
    });

    this.setState({
      all: [...all, ...long],
    });
  }

  showFree() {
    const { onlyFree, prices, all } = this.state;
    const free = prices.filter((rental) => {
      if (onlyFree) {
        return rental.typeService === 'Vélo en libre service';
      }
    });

    this.setState({
      all: [...all, ...free],
    });
  }

  showParking() {
    const { onlyParking, prices, all } = this.state;
    const parking = prices.filter((rental) => {
      if (onlyParking) {
        return rental.typeService === 'stationnement vélo abrité';
      }
    });

    this.setState({
      all: [...all, ...parking],
    });
  }

  handleCheckbox(e) {
    const { name, checked } = e.target;

    this.setState({ [name]: checked });
  }

  render() {
    const { prices, all } = this.state;

    return (
      <div className={styles.main}>
        <h1>Tarifs</h1>

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

        <ul>
          {all.length > 0
            ? all.map((price) => <PricesCard key={price.id} price={price} />)
            : prices.map((price) => (
                // eslint-disable-next-line react/jsx-indent
                <PricesCard key={price.id} price={price} />
              ))}
        </ul>
      </div>
    );
  }
}

export default PricesList;

// if (onlyLong || onlyFree || onlyParking) {
//   const long = prices.filter((rental) => {
//     if (onlyLong) {
//       return (
//         rental.typeService === 'location de vélo moyenne et longue durée'
//       );
//     }
//   });
//   const free = prices.filter((rental) => {
//     if (onlyFree) {
//       return rental.typeService === 'Vélo en libre service';
//     }
//   });
//   const parking = prices.filter((rental) => {
//     if (onlyParking) {
//       return rental.typeService === 'stationnement vélo abrité';
//     }
//   });

//   allAbo.push([...parking, ...long, ...free]);
// } else {
//   allAbo.push(prices);
// }

/*


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
              } else if (onlyLong && onlyFree) {
                //ToDO
                return;

              } else if (onlyLong && onlyParking) {
                //ToDO
                return;
              } else if (onlyFree && onlyParking) {
                //ToDO
                return;
              } else {
                return rental.typeService;
              }
            })
*/
