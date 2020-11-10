import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './views/Home';

import PricesList from './components/PricesList';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/prices" component={PricesList} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
