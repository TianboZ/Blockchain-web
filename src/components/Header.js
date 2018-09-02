import React from 'react';
import logo from '../assets/images/logo.svg'
import DApp from "./DApp";

class Header extends React.Component {
    render() {
        return (
            <div>
                <header
                    className="App-header"
                >
                    <img
                        src={logo}
                        className="App-logo" alt="logo"
                    />
                    <h1
                        className="App-title"
                    >
                        Project
                    </h1>
                </header>
            </div>

        );
    }
}

export default Header;