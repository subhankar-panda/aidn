import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {withFirebase} from './data/firebase'
import HomePage from './pages/HomePage';
import Nav from './components/Nav';
import DoctorsPage from './pages/DoctorsPage';
import EntryPage from './pages/EntryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AssistantPage from './pages/AssistantPage';
import EmergencyPage from './pages/EmergencyPage';

class Routes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null
    }
  }

    async componentDidMount() {
      try {

        const user = await this.props.firebase.getUserById(localStorage.person);
        this.setState({user, authenticated: true})
      } catch(e) {
        console.error(e);
        this.setState({authenticated: false});
      }
    }

  withLayout = (Child) => (
    <>
      <Nav user={this.state.user} authenticated={this.state.authenticated}/>
      <Child user={this.state.user}/>
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
        <Route path="/emergency" exact={true}>
          {this.withLayout(EmergencyPage)}
        </Route>
      </Switch>

    );
  }
}

export default withFirebase(Routes);