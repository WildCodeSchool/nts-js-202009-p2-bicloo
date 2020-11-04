import React, { Component } from 'react';
import axios from 'axios';

import BikesMap from './components/BikesMap';
import ListSlider from './components/ListSlider';
import StationsList from './components/StationsList';
import WrapperStation from './components/WrapperStation';
import Header from './components/Header';


class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: {},
      loading: true,
      currentAddress: '',
    };
    this.fetchData = this.fetchData.bind(this);
    this.setCurrentAdress = this.setCurrentAdress.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /** Fonction pour mettre a jour l'adresse actuel
   * on recurperes ses coordonners:
   * - id
   * - address
   * - geographique
   */
  setCurrentAdress(currAddress) {
    this.setState({ currentAddress: currAddress });
  }

  fetchData() {
    axios
      .get(
        'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole-disponibilites&q=&rows=50&facet=banking&facet=bonus&facet=status&facet=contract_name&refine.status=OPEN',
        {
          headers: {
            Authorization:
              'ApiKey c05f988c5637dd721c0c53db8abf952a3416a0ac0fa2cd535d82a521 ',
          },
        }
      )

      .then(({ data }) => {
        const stations = data.records.map((record) => {
          return {
            id: record.recordid,
            address: record.fields.address,
            name: record.fields.name,
            availableBikes: record.fields.available_bikes,
            availableBikeStand: record.fields.available_bike_stands,
            banking: record.fields.banking,
            position: record.fields.position,
          };
        });
        this.setState({ stations, loading: false });
      })
      .catch((err) => alert(err.message));
  }

  render() {
    const { loading, stations } = this.state;
    return (
      <div className="App">
        <Header setCurrentAdress={this.setCurrentAdress} />
        {!loading && (
          <>
            <BikesMap {...this.state} />
            <ListSlider {...this.state} />
            <StationsList {...this.state} />
            <WrapperStation stations={stations} />
          </>
        )}
      </div>
    );
  }
}
export default App;
