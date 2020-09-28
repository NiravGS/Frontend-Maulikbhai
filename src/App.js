import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/**
 * App Imports
 */
import './assets/scss/app.scss';
import { history, store, persistor } from './redux/store';
import indexRoutes from './routes/index';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop>
            <Switch>
              {
                indexRoutes.map((prop, key) => {
                  return <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                })
              }
            </Switch>
          </ScrollToTop>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
