import React, { Component } from 'react';
import { Checkbox } from 'antd';

class Item extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.check !== this.state.check) {
            return true;
        } else {
            return false;
        }
    }

    state = {
        check: false,
        clicks: 0
    }

    handleOnChange = (e)=>{
        if (e.target.checked) {
            this.setState((prevState)=>({
                clicks: prevState.clicks + 1,
                check: true
            }));
            this.props.selectItem();
        } else {
            this.setState((prevState) => ({
                check: false,
                clicks: prevState.clicks + 1
            }));
            this.props.deleteItem();
        }
    }

    render() {
        console.log('render item');
        return (
            <div>
                <Checkbox onChange={this.handleOnChange}>Buy</Checkbox>
                {this.props.content}
            </div>
        );
    }
}

export default Item;