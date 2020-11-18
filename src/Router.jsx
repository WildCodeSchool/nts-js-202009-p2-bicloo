import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';

import NavigationButton from './components/NavigationButton';
import PricesList from './components/PricesList';
import PopupContact from './components/PopupContact';

class Router extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.handlePopup = this.handlePopup.bind(this);
  }

  handlePopup() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <BrowserRouter>
        <NavigationButton handlePopup={this.handlePopup} />
        <PopupContact isOpen={isOpen} handlePopup={this.handlePopup} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/prices" component={PricesList} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
