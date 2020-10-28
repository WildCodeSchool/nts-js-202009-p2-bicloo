import React, { Component } from 'react';
import axios from 'axios';

import BikesMap from './components/BikesMap';
import StationsList from './components/StationsList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
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
        this.setState({ data: data.records });
        this.setState({ loading: false });
      })
      .catch((err) => alert(err.message));
  }

  render() {
    const { loading, data } = this.state;
    return (
      <div className="App">
        {!loading && (
          <>
            <BikesMap />
            <StationsList infos={data} />
          </>
        )}
      </div>
    );
  }
}

export default App;
