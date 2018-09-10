import React, {Component} from 'react';
import {Form, Input, Button, Select} from 'antd';
import {Menu, Dropdown, Icon} from 'antd';
import axios from 'axios';
import {API_ROOT} from "../constants";
import web3 from "./web3";
import storehash from "./storehash";
import ipfs from "./ipfs";

const Option = Select.Option;
const FormItem = Form.Item;

class RegistrationForm extends Component {

    state = {
        description: '',
        price: '',
        longitude: '',
        latitude: '',

        ipfsHash: null,
        buffer: '',
        ethAddress: '',
        blockNumber: '',
        transactionHash: '',
        gasUsed: '',
        txReceipt: ''
    };

    getHexfromIPFSHash = (ipfsHash) => {
        let hash = Buffer.from(ipfsHash).toString('hex');
        return {
            hash_start: `0x${hash.substring(0, 64)}`,
            hash_end: `0x${hash.slice(64)}`,
            protocol_type: '0x01'
        }
    }

    handleBtnClick = (e) => {
        this.sendToIpfs();
        console.log('------------------------------------------------------------------')
        console.log(this.state);
        //alert(this.state);
        const reqBody = {
            ipfs_hash: this.state.ipfsHash,
            protocol_type: 0x01
        }

        // axios.post(`${API_ROOT}/register`, reqBody)
        //     .then((response) => {
        //         console.log(response);
        //         // if success, jump to home, clean state data
        //         this.setState(() => ({
        //             description: '',
        //             price: '',
        //             longitude: '',
        //             latitude: ''
        //         }));
        //         this.props.history.push('/home');
        //     }).catch((error) => {
        //     console.log(error);
        // });
    }

    sendToIpfs = () => {
        this.convertToBuffer();
        this.onSubmit();
    }

    convertToBuffer = async () => {
        //file is converted to a buffer for upload to IPFS
        const obj = {
            description: this.state.description,
            price: this.state.price,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        };

        //const buffer = await Buffer.from(reader.result);
        const buffer = await Buffer.from(JSON.stringify(obj));
        //set this buffer -using es6 syntax

        this.setState({buffer});
    };


    onSubmit = async () => {
        //event.preventDefault();
        //bring in user's metamask account address
        const account = web3.eth.accounts.privateKeyToAccount('0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC');
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        console.log('Sending from Metamask account: ' + account.address);
        //obtain contract address from storehash.js
        const ethAddress = await storehash.options.address;
        this.setState({ethAddress});
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ipfsHash: ipfsHash[0].hash});
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
            //return the transaction hash from the ethereum contract
            //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

            let data = this.getHexfromIPFSHash(this.state.ipfsHash);
            console.log(data);
            storehash.methods.postProduct(data.hash_start, data.hash_end, data.protocol_type).send({
                from: account.address,
                gas: 1000000
            }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
            }); //storehash
        }) //await ipfs.add
    }; //onSubmit

    handleInputChange = (input, e) => {
        if (input === 'description') {
            this.setState({
                description: e.target.value
            })
        }
        if (input === 'longitude') {
            this.setState({
                longitude: e.target.value
            })
        }
        if (input === 'latitude') {
            this.setState({
                latitude: e.target.value
            })
        }
        if (input === 'price') {
            this.setState({
                price: e.target.value
            })
        }
    }

    render() {
        console.log('render registration');

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const description = 'description';
        const price = 'price';
        const longitude = 'longitude';
        const latitude = 'latitude';

        return (
            <Form
                className="register-form"
            >
                <FormItem
                    label={(
                        <span>
                            Type&nbsp;
                        </span>
                    )}
                    {...formItemLayout}
                >
                    <Select
                        defaultValue="SDPP"
                        style={{ width: 200}}
                    >
                        <Option value="others">OTHER</Option>
                        <Option value="SDPP">SDPP</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label={(
                        <span>
                            Description&nbsp;
                        </span>
                    )}
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.description}
                        onChange={this.handleInputChange.bind(this, description)}
                    />
                </FormItem>
                <FormItem
                    label={(
                        <span>
                            Price&nbsp;
                        </span>
                    )}
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.price}
                        onChange={this.handleInputChange.bind(this, price)}
                    />
                </FormItem>
                <FormItem
                    label={(
                        <span>
                            Longitude&nbsp;
                        </span>
                    )}
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.longitude}
                        onChange={this.handleInputChange.bind(this, longitude)}
                    />
                </FormItem>
                <FormItem
                    label={(
                        <span>
                            Latitude&nbsp;
                        </span>
                    )}
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.latitude}
                        onChange={this.handleInputChange.bind(this, latitude)}
                    />
                </FormItem>
                <FormItem
                    {...tailFormItemLayout}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleBtnClick}
                    >
                        Register
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;