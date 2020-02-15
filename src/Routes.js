import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nav from './components/Nav';
import DoctorsPage from './pages/DoctorsPage';
import EntryPage from './pages/EntryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AssistantPage from './pages/AssistantPage';

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
        <Route path="/" exact={true}>
          {this.withLayout(HomePage)}
        </Route>
        <Route path="/doctors" exact={true}>
          {this.withLayout(DoctorsPage)}
        </Route>
        <Route path="/medical-history" exact={true}>
          {this.withLayout(EntryPage)}
        </Route>
        <Route path="/signup" exact={true}>
          {this.withLayout(SignUpPage)}
        </Route>
        <Route path="/login" exact={true}>
          {this.withLayout(LoginPage)}
        </Route>
        <Route path="/assist" exact={true}>
          {this.withLayout(AssistantPage)}
        </Route>
      </Switch>

    );
  }
}

export default Routes;