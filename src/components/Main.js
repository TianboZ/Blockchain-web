import React from 'react';
import RegistrationForm from "./RegistrationForm";
import QueryProduct from "./QueryProduct";
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/register" component={RegistrationForm}/>
                    <Route path="/search" component={QueryProduct}/>
                    <Route component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default Main;