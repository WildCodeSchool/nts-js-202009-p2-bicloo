import React, { Component } from 'react';
import axios from 'axios';

import PopupContact from './components/PopupContact';
import WrapperStation from './components/WrapperStation';
import Header from './components/Header';
import NavigationButton from './components/NavigationButton';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stations: {},
      loading: true,
      currentAddress: '',
      arrivalAddress: '',
      bikesIsChecked: true,
      standsIsChecked: true,
      bankingIsChecked: true,
      isOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setCurrentAdress = this.setCurrentAdress.bind(this);
    this.setArrivalAddress = this.setArrivalAddress.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  /** Fonctions pour mettre a jour l'adresse actuel et
   * la deuxième l'address d'arriver
   * on recurperes ses coordonners:
   * - id
   * - address
   * - geographique
   */
  setCurrentAdress(currAddress) {
    this.setState({ currentAddress: currAddress });
  }

  setArrivalAddress(arrAddress) {
    this.setState({ arrivalAddress: arrAddress });
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
    this.setState({ [e.target.name]: e.target.checked });
  }

  handlePopup() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const {
      loading,
      stations,
      bikesIsChecked,
      standsIsChecked,
      bankingIsChecked,
      isOpen,
    } = this.state;
    return (
      <div className="App">
        <PopupContact isOpen={isOpen} handlePopup={this.handlePopup} />
        <Header
          setCurrentAdress={this.setCurrentAdress}
          handleChange={this.handleChange}
          bikesIsChecked={bikesIsChecked}
          standsIsChecked={standsIsChecked}
          bankingIsChecked={bankingIsChecked}
          setArrivalAddress={this.setArrivalAddress}
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
        <NavigationButton handlePopup={this.handlePopup} />
      </div>
    );
  }
}
export default App;
