import React, { Component } from 'react';
//import logo from ‘./logo.svg’;
//import './DApp.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Button, Table, Grid, Form } from 'react-bootstrap';

class DApp extends Component {

    state = {
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: ''
    };

    componentDidMount = ()=>{
        this.convertToBuffer();
        this.onSubmit();
    }

    convertToBuffer = async() => {
        //file is converted to a buffer for upload to IPFS
        const obj = {
            a: 11111,
            b: 'tom'
        };
        //const buffer = await Buffer.from(reader.result);
        const buffer = await Buffer.from(JSON.stringify(obj));
        //set this buffer -using es6 syntax

        this.setState({buffer});
    };


    onSubmit = async () => {
        //event.preventDefault();
        //bring in user's metamask account address
        const accounts = await web3.eth.getAccounts();

        console.log('Sending from Metamask account: ' + accounts[0]);
        //obtain contract address from storehash.js
        const ethAddress= await storehash.options.address;
        this.setState({ethAddress});
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err,ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ ipfsHash:ipfsHash[0].hash });
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
            //return the transaction hash from the ethereum contract
            //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

            storehash.methods.sendHash(this.state.ipfsHash).send({
                from: accounts[0]
            }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
            }); //storehash
        }) //await ipfs.add
    }; //onSubmit
    render() {

        return (
            <div>
                <Grid>
                    <h3> Choose file to send to IPFS </h3>
                </Grid>
            </div>
        );
    } //render
} //App
export default DApp;