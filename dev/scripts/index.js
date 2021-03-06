import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import { FIREBASE_CONFIG } from './config';

// Initialize Firebase
class Index extends React.Component {
  constructor() {
    super();

    // TODO-REDUX: Draw from redux `store`
    this.state = {
      loggedIn: false,
      user: {},
    };

    this.firebase = window.firebase;
    this.firebase.initializeApp(FIREBASE_CONFIG);

    // TODO-REDUX: Draw from redux `store`
    this.firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loggedIn: !!(user),
        user,
      })
    })
  }

  render() {
    return (
      <div className="Index">
        {/* <NavBar logInUser={this.logInUser} googleSignIn={this.googleSignIn} signOutUser={this.signOutUser} /> */}
        <Router />
      </div>
    );
  }
}

export default Index;

render(<Index />, document.querySelector('#app'));
