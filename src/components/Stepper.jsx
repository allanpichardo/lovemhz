import React, { Component } from 'react';
import 'jquery-knob';
import stepLeft from '../images/ic_step_left.svg';
import stepRight from '../images/ic_step_right.svg';

export default class Stepper extends Component {

    constructor(props) {
        super(props);


        this.state = {
            value: this.props.items ? this.props.items[0] : this.props.default,
            itemIndex: 0,
            items: this.props.items,
        }

        this.leftClicked = this.leftClicked.bind(this);
        this.rightClicked = this.rightClicked.bind(this);
        this.hasItems = this.hasItems.bind(this);
    }

    componentDidMount() {

    }

    hasItems() {
        return !!(this.state.items);
    }

    leftClicked() {
        if(this.hasItems()) {
            if(this.state.itemIndex > 0) {
                let idx = (this.state.itemIndex - 1);
                let val = this.state.items[idx];
                this.input.value = val;
                this.props.onChange(val);
                this.setState({
                    itemIndex: idx,
                    value: val,
                });
            }
        } else {
            let val = parseInt(this.state.value);
            if(val > parseInt(this.props.min)) {
                val = val - 1;
            }
            this.input.value = val;
            this.props.onChange(val);
            this.setState({
                value: val,
            });
        }
    }

    rightClicked() {
        if(this.hasItems()) {
            if(this.state.itemIndex < this.state.items.length - 1) {
                let idx = this.state.itemIndex + 1;
                let val = this.state.items[idx];
                this.input.value = val;
                this.props.onChange(val);
                this.setState({
                    itemIndex: idx,
                    value: val,
                });
            }
        } else {
            let val = parseInt(this.state.value);
            if(val < parseInt(this.props.max)) {
                val = val + 1;
            }
            this.input.value = val;
            this.props.onChange(val);
            this.setState({
                value: val,
            });
        }
    }

    render() {
        return (
            <div className="stepper">
                <a href="#">
                    <img className="stepButton" src={stepLeft} onClick={this.leftClicked}/>
                </a>
                <input className="stepInput" defaultValue={this.state.value} ref={(input) => this.input = input} readOnly/>
                <a href="#">
                    <img className="stepButton" src={stepRight} onClick={this.rightClicked}/>
                </a>
            </div>
        );
    }
}