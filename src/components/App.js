import React, { Component } from 'react';
import WrappedRegistrationForm from "./RegistrationForm";
import QueryProduct from "./QueryProduct";
import Header from "./Header";
import {Main} from "./Main";

class App extends Component {
  render() {
    return (
      <div>
            <Header />
            <Main />
      </div>
    );
  }
}

export default App;
