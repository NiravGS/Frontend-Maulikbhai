import React from 'react';
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';

/**
 * App Imports
 */
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProtectedRoutes from '../routes/Protected';
import { PublicRoutes, PrivateRoutes, PrivateUserRoutes } from '../routes/routes';

const BaseLayout = () => {

  const role = useSelector(state => state.auth.role);

  return (
    <section className="home-layout">
      <header className="header">
        <Header />
      </header>
      <main className="main-content">
        <Switch>
          {
            PublicRoutes.map((props, key) => {
              return (
                <Route 
                  exact 
                  path={props.path} 
                  component={props.component}
                  key={key} />
              )
            })
          }
          <ProtectedRoutes>
            {
              role === 'user' 
              ? PrivateUserRoutes.map((props, key) => {
                  return (
                    <Route
                      exact
                      path={props.path}
                      component={props.component}
                      key={key} />
                  )
                })
              : PrivateRoutes.map((props, key) => {
                return (
                  <Route
                    exact
                    path={props.path}
                    component={props.component}
                    key={key} />
                )
              })
            }
          </ProtectedRoutes>
        </Switch>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </section>
  )
}

export default BaseLayout;
