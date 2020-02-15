import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nav from './components/Nav';

class Routes extends React.Component {

  withLayout = (Child) => (
    <>
      <Nav />
      <Child />
    </>
  );

  render() {
    return (
      <Switch>
        <Route path="/">
          {this.withLayout(HomePage)}
        </Route>
      </Switch>
    );
  }
}

export default Routes;