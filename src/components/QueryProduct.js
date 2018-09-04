import React, { Component } from 'react';
import {Dropdown, Icon, Menu} from "antd";
import { Button } from 'antd';
import Item from "./Item";
import axios from 'axios';
import { API_ROOT } from "../constants";
import web3 from "./web3";

class QueryProduct extends Component {

    state = {
        searchTag:'',
        items: [],
        selectedIndex: []
    }

    handleMenuClick = (e)=>{
        if (e.key === '0') {
            this.setState({
                searchTag: 'SDPP'
            });
        }
    }

    handleOnClick = ()=>{


        const query = {
            tag: 'SDPP'
        }

        //axios.get(`${API_ROOT}/search?tag=SDPP`)
        axios.get(`${API_ROOT}/search`, {params: query})
        .then((response)=>{
            console.log(response.data);
            this.setState({
                items: response.data
            });

        })
        .catch((error)=>{
            console.log(error);
        });
    }

    handleSelectItem = (index)=>{
        const newSelectedIndex = [...this.state.selectedIndex, index];
        this.setState({
            selectedIndex: newSelectedIndex
        })
    }

    handleDeleteItem = (index)=>{
        const uniArr = [...(new Set(this.state.selectedIndex))];
        const i = uniArr.indexOf(index);
        uniArr.splice(i, 1);
        this.setState({
            selectedIndex: uniArr
        })
    }

    getAllSelectedItem=()=>{
        const selectedItems = [];
        for (let i = 0; i < this.state.selectedIndex.length; i++) {
            const index = this.state.selectedIndex[i];
            selectedItems.push(this.state.items[index]);
        }
        console.log(selectedItems);
        return selectedItems;
    }

    handleClickBtn=()=>{
        const selectedItems = this.getAllSelectedItem();
        alert(selectedItems);
        axios.post('/buy', {selectedItems})
            .then((response)=>{
                console.log(response);
            }).catch((error)=>{
            console.log(error);
        });
    }
    render() {

        console.log('render query product');

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="0">SDPP</Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                >
                    <a
                        className="ant-dropdown-link" href="#">
                        search tag
                        <Icon type="down" />
                    </a>
                </Dropdown>
                <br/><br/>
                <Button
                    type="primary"
                    icon="search"
                    onClick={this.handleOnClick}
                >
                    Search
                </Button>
                <ul>
                    {
                        this.state.items.map((item, index)=> {
                            return (
                                <Item
                                    content={item}
                                    index={index}
                                    selectItem={this.handleSelectItem.bind(this, index)}
                                    deleteItem={this.handleDeleteItem.bind(this, index)}
                                />
                            )
                        })
                    }
                </ul>
                <Button
                    onClick={this.handleClickBtn}
                >
                    Buy!
                </Button>
            </div>
        );
    }
}

export default QueryProduct;