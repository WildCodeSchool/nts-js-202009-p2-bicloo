import React, { Component } from 'react';
import axios from 'axios';

import WrapperStation from './components/WrapperStation';

import Header from './components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: {},
      loading: true,
      bikesIsChecked: true,
      standsIsChecked: true,
      bankingIsChecked: true,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
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

  handleChange(e) {
    if (e.target.name === 'bikes') {
      this.setState({ bikesIsChecked: e.target.checked });
    }
    if (e.target.name === 'stands') {
      this.setState({ standsIsChecked: e.target.checked });
    }
    if (e.target.name === 'banking') {
      this.setState({ bankingIsChecked: e.target.checked });
    }
  }

  render() {
    const {
      loading,
      stations,
      bikesIsChecked,
      standsIsChecked,
      bankingIsChecked,
    } = this.state;
    return (
      <div className="App">
        <Header
          handleChange={this.handleChange}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
        />
        {!loading && (
          <>
            <WrapperStation
              stations={stations}
              bikesIsChecked={bikesIsChecked}
              standsIsChecked={standsIsChecked}
              bankingIsChecked={bankingIsChecked}
            />
          </>
        )}
      </div>
    );
  }
}
export default App;
