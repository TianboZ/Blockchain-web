import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import axios from 'axios';

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

    handleSubmit = (e) => {
        console.log(this.state);
        axios.post('/register', this.state)
            .then((response)=>{
                console.log(response);
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
            <Form onSubmit={this.handleSubmit}>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                >
                    <a
                        className="ant-dropdown-link" href="#">
                        product type
                        <Icon type="down" />
                    </a>
                </Dropdown>
                <FormItem
                    label={(
                        <span>
                            description&nbsp;
                        </span>
                    )}
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
                >
                    <Input
                        value={this.state.latitude}
                        onChange={this.handleInputChange.bind(this, latitude)}
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;