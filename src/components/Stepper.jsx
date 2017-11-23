import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/Synth.css';
import stepLeft from '../images/ic_step_left.svg';
import stepRight from '../images/ic_step_right.svg';

export default class Stepper extends Component {

    constructor(props) {
        super(props);


        this.state = {
            value: this.props.default,
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
            let idx = this.state.itemIndex;
            let val = this.state.items[idx];
            this.input.value = val;
            this.setState({
                itemIndex: (idx - 1) % this.state.items.length,
                value: val,
            });
        } else {
            let val = parseInt(this.state.value);
            if(val > parseInt(this.props.min)) {
                val = val - 1;
            }
            this.input.value = val;
            this.setState({
                value: val,
            });
        }
    }

    rightClicked() {
        if(this.hasItems()) {
            let idx = this.state.itemIndex;
            let val = this.state.items[idx];
            this.input.value = val;
            this.setState({
                itemIndex: (idx + 1) % this.state.items.length,
                value: val,
            });
        } else {
            let val = parseInt(this.state.value);
            if(val < parseInt(this.props.max)) {
                val = val + 1;
            }
            this.input.value = val;
            this.setState({
                value: val,
            });
        }
    }

    render() {
        return (
            <div className="stepper">
                <a>
                    <img className="stepButton" src={stepLeft} onClick={this.leftClicked}/>
                </a>
                <input className="stepInput" defaultValue={this.state.value} ref={(input) => this.input = input} readOnly/>
                <a>
                    <img className="stepButton" src={stepRight} onClick={this.rightClicked}/>
                </a>
            </div>
        );
    }
}