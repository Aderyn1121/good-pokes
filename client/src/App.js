import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPane from './components/LoginPane';
import PokePage from './components/PokePage';
import Home from './components/Home';

import { loadToken } from './store/authentication';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    this.setState({ loaded: true })
    this.props.loadToken();
  }

  render() {
    if (!this.state.loaded) return null;

    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path='/' exact={true} component={Home} /> */}
          <PrivateRoute path='/' exact={true} needLogin={this.props.needLogin} component={Home} />
          <PrivateRoute path='/profile' exact={true} needLogin={this.props.needLogin} component={Profile} />
          <Route path='/login' component={LoginPane} />
          <Route path='/sign-up' component={SignUpPage} />
          <Route path='/pokemon/:pokemonName' exact={true} component={PokePage} />
        </Switch>
      </BrowserRouter>
    )
  }


}


const mapStateToProps = state => {
  return {
    needLogin: !state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  App
);
