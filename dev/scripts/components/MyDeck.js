import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SingleCard from './SingleCard';

class MyDeck extends React.Component {
  constructor() {
    super();
    this.state = {
      cardId: '',
      cardInfo: {},
      cardSet: [],
      loadedCards: false,
      user: {},
    };

    this.firebase = window.firebase;
    this.getCardDeck = this.getCardDeck.bind(this);
  }

  componentDidMount() {
    // TODO-REDUX: Draw from redux `store`
    this.firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState({
          user,
        }, () => {
          this.getCardDeck();
        })
        : null;
    });
  }

  getCardDeck() {
    const dbRefUser = this.firebase.database().ref(`users/${this.firebase.auth().currentUser.uid}`);
    dbRefUser.on('value', (snapshot) => {
      const cardArray = [];
      const selectedCard = snapshot.val();
      // snapshot value captures the value of what is added when the function is clicked and pushed to fbDB
      for (const itemKey in selectedCard) {
        selectedCard[itemKey].key = itemKey;
        cardArray.push(selectedCard[itemKey]);
      }
      this.setState({
        cardSet: cardArray,
        loadedCards: true,
      });
    });
  }

  render() {
    const { cardSet } = this.state;
    return (
      <React.Fragment>
        <NavBar
          logInUser={this.logInUser}
          googleSignIn={this.googleSignIn}
          signOutUser={this.signOutUser}
        />
        <main className="CardGrid">
          <div className="wrapper">
            <h1>This Is Your Deck:</h1>
            <div className="displayCards">
              {
                this.state.loadedCards
                  ? cardSet.map(card => (
                    <Link key={card.cardDetails.id} to={`/franchises/pokemon/${card.cardDetails.id}`}>
                      <SingleCard data={card.cardDetails.info} key={card.cardDetails.id} />
                    </Link>
                  ))
                  : <p>Sign and Build Your Own Deck!</p>
              }
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default MyDeck;
