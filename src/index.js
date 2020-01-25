import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from './pages/home';
import Product_profile from './pages/product_profile';
import Product_search from './pages/product_search';
import Not_found from './pages/not_found'

import MainSearchBar from './components/MainSearchBar'

// import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/item/:id" component={Product_profile} />
        <Route path="/items" component={Product_search} />
        <Route component={Not_found} />
      </Switch>
    </Router>
  )
  
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
