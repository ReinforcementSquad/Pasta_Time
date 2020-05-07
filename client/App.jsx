import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from './components/logo.jsx';
import Root from './containers/root.jsx';
import Login from './containers/login.jsx';
import Signup from './containers/signup.jsx';
import GoogleLogin from './containers/googleLogin.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Logo />
        <Route exact path="/" component={ Root } />
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ Signup } />
        <Route path="/google-OAth" component={ GoogleLogin } />
      </Router>
    );
  }
}

export default App;
