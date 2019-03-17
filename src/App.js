import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDd5vYeojBjrK0PnKZrKxK98FUQnAoiPyc",
      authDomain: "auth-4ca2b.firebaseapp.com",
      databaseURL: "https://auth-4ca2b.firebaseio.com",
      projectId: "auth-4ca2b",
      storageBucket: "auth-4ca2b.appspot.com",
      messagingSenderId: "835785816359"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>;
      case false: 
      return <LoginForm />;
      default: <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
