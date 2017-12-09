import React, { Component } from 'react';
import 'jquery-knob';

export default class Stepper extends Component {

    constructor(props) {
        super(props);


        this.state = {
            value: this.props.items ? this.props.items[0] : this.props.default,
            itemIndex: 0,
            items: this.props.items,
            isLeftEnabled: false,
            isRightEnabled: false,
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

    leftClicked(e) {
        e.preventDefault();

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
                this.input.value = val;
                this.props.onChange(val);
                this.setState({
                    value: val,
                });
            }
        }
    }

    rightClicked(e) {
        e.preventDefault();

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
                this.input.value = val;
                this.props.onChange(val);
                this.setState({
                    value: val,
                });
            }
        }
    }

    render() {

        let leftClasses = '';
        let rightClasses = '';
        if(this.hasItems()) {
            leftClasses = this.state.itemIndex > 0 ? 'stepButton' : 'stepButton stepButton_disabled';
            rightClasses = this.state.itemIndex < this.state.items.length - 1 ? 'stepButton': 'stepButton stepButton_disabled';
        } else {
            leftClasses = parseInt(this.state.value) > parseInt(this.props.min) ? 'stepButton' : 'stepButton stepButton_disabled';
            rightClasses = parseInt(this.state.value) < parseInt(this.props.max) ? 'stepButton': 'stepButton stepButton_disabled';
        }

        return (
            <div className="stepper">
                <a href="#" onClick={(e) => {this.leftClicked(e)}}>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.38 33.62">
                        <g id="Layer_2">
                            <g id="appbar">
                                <g id="Transport">
                                    <g id="Tempo_Stepper">
                                        <path id="leftStep" className={leftClasses}
                                              d="M.5,17.68,27.88,33.48a1,1,0,0,0,1.5-.87V1a1,1,0,0,0-1.5-.87L.5,15.94A1,1,0,0,0,.5,17.68Z"/>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
                <input className="stepInput" defaultValue={this.state.value} ref={(input) => this.input = input} readOnly/>
                <a href="#" onClick={(e) => {this.rightClicked(e)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.38 33.62">
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <path id="rightStep" className={rightClasses}
                                              d="M28.88,17.68,1.5,33.48A1,1,0,0,1,0,32.62V1A1,1,0,0,1,1.5.14L28.88,15.94A1,1,0,0,1,28.88,17.68Z"/>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
        );
    }
}