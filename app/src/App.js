import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import ProductPage from './components/ProductPage/index';
import Products from './components/Products/index';
import DefaultLayout from './layouts/DefaultLayout';
import { AppProvider } from './store/AppContext';

function App() {
  return (
    <Router>
      <Switch>
        <AppProvider>
          <Route path='/' exact>
            <DefaultLayout>
              <Products />
            </DefaultLayout>
          </Route>
          <Route path='/product/:id'>
            <DefaultLayout>
              <ProductPage />
            </DefaultLayout>
          </Route>
        </AppProvider>
      </Switch>
    </Router>
  );
}

export default App;
