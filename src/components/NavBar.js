import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class NavBar extends Component {
    render() {
        return (
            <div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical-left">
                    <Menu.Item key="1">
                        <Icon type="home" />
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="login" />
                        <span>Register Product</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="search" />
                        <span>Search</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default NavBar;
