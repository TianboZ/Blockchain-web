import React, {Component} from 'react';
import {Dropdown, Icon, Menu} from "antd";
import {Button} from 'antd';
import Item from "./Item";
import axios from 'axios';
import storehash from "./storehash";
import ipfs from "./ipfs";
import web3 from "./web3";
import hex2ascii from 'hex2ascii';

class QueryProduct extends Component {

    state = {
        searchTag: '',
        items: [],
        selectedIndex: []
    }

    handleMenuClick = (e) => {
        if (e.key === '0') {
            this.setState({
                searchTag: 'SDPP'
            });
        }
    }

    handleOnClick = () => {
        let products = [];
        const account = web3.eth.accounts.privateKeyToAccount('0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC');
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
        storehash.getPastEvents("PostProducts", {fromBlock: 0, toBlock: 'latest'}).then(
            function (events) {
                //console.log(events);
                events.forEach(function (product) {
                    let product_data = product.returnValues
                    //console.log(product_data["_hash_start"]);
                    let ipfs_pointer = hex2ascii(product_data["hash_start"]) + hex2ascii(product_data["hash_end"])
                    //console.log(ipfs_pointer)
                    ipfs.files.get(ipfs_pointer, function (err, files) {
                        files.forEach((file) => {
                                let product_description = file.content.toString('utf8')
                                products.push(product_description);
                            }
                        )
                    });

                });
            }
        );
        console.log(products);
        this.setState(() => ({
            items: products
        }))
    }

    handleSelectItem = (index) => {
        const newSelectedIndex = [...this.state.selectedIndex, index];
        this.setState({
            selectedIndex: newSelectedIndex
        })
    }

    handleDeleteItem = (index) => {
        const uniArr = [...(new Set(this.state.selectedIndex))];
        const i = uniArr.indexOf(index);
        uniArr.splice(i, 1);
        this.setState({
            selectedIndex: uniArr
        })
    }

    getAllSelectedItem = () => {
        const selectedItems = [];
        for (let i = 0; i < this.state.selectedIndex.length; i++) {
            const index = this.state.selectedIndex[i];
            selectedItems.push(this.state.items[index]);
        }
        console.log(selectedItems);
        return selectedItems;
    }

    handleClickBtn = () => {
        const selectedItems = this.getAllSelectedItem();
        alert(selectedItems);
        axios.post('/buy', {selectedItems})
            .then((response) => {
                console.log(response);
            }).catch((error) => {
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
                        <Icon type="down"/>
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
                        this.state.items.map((item, index) => {
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