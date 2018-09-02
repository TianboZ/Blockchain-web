import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import axios from 'axios';
import {API_ROOT} from "../constants";

const menu = (
    <Menu>
        <Menu.Item key="SDPP">SDPP</Menu.Item>
    </Menu>
);

const FormItem = Form.Item;

class RegistrationForm extends Component {

    state = {
        description: '',
        price: '',
        longitude: '',
        latitude:''
    };

    handleBtnClick = (e) => {
        console.log(this.state);
        alert(this.state);
        axios.post(`${API_ROOT}/register`, this.state)
            .then((response)=>{
                console.log(response);
                // if success, jump to home, clean state data
                this.setState(()=>({
                    description: '',
                    price: '',
                    longitude: '',
                    latitude:''
                }));
                this.props.history.push('/home');
            }).catch((error)=>{
                console.log(error);
            });
    }

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
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    {...formItemLayout}
                >
                    <a
                        className="ant-dropdown-link"
                    >
                        product type
                        <Icon type="down" />
                    </a>
                </Dropdown>
                <br/><br/>
                <FormItem
                    label={(
                        <span>
                            description&nbsp;
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
                            price&nbsp;
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
                            longitude&nbsp;
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
                            longitude&nbsp;
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