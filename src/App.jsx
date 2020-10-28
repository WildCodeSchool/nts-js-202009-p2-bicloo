import React, { Component } from 'react';
import axios from 'axios';

import BikesMap from './components/BikesMap';
import StationsList from './components/StationsList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: {},
      loading: true,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(
        'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole-disponibilites&q=&rows=125&facet=banking&facet=bonus&facet=status&facet=contract_name&refine.status=OPEN'
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
        this.setState({ stations });
        this.setState({ loading: false });
      })
      .catch((err) => alert(err.message));
  }

  render() {
    const { loading, stations } = this.state;
    return (
      <div className="App">
        {!loading && (
          <>
            <BikesMap />
            <StationsList stations={stations} />
          </>
        )}
      </div>
    );
  }
}

export default App;
