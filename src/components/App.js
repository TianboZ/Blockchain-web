import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Header from "./Header";
import Main from "./Main";
import NavBar from "./NavBar";
import DApp from "./DApp";

const {Sider, Content} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <NavBar />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ margin: '0 16px' }}>
                        <Main />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;