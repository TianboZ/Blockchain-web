import React, { Component } from 'react';
import TodoList from "./TodoList";
import WrappedRegistrationForm from "./RegistrationForm";
import QueryProduct from "./QueryProduct";

class App extends Component {
  render() {
    return (
      <div>
            <WrappedRegistrationForm />
            <QueryProduct />
      </div>
    );
  }
}

export default App;
