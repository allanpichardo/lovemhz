import React, { Component } from 'react';
import 'jquery-knob';

export default class Stepper extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.leftClicked = this.leftClicked.bind(this);
        this.rightClicked = this.rightClicked.bind(this);
        this.hasItems = this.hasItems.bind(this);
        this.canStepLeft = this.canStepLeft.bind(this);
        this.canStepRight = this.canStepRight.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
    }

    getInitialState() {
        let value = this.props.default;
        let itemIndex = 0;

        if(!!this.props.items) {
            itemIndex = this.props.items.indexOf(value);
        }

        return {
            value: value,
            itemIndex: itemIndex,
            items: this.props.items,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.default !== this.props.default) {
            this.setState({
                value: nextProps.default,
            });

            if(this.hasItems()) {
                let newIndex = this.props.items.indexOf(nextProps.default);
                this.setState({
                    itemIndex: newIndex,
                })
            }
        }
    }

    hasItems() {
        return !!(this.state.items);
    }

    leftClicked(e) {
        if(e) {
            e.preventDefault();
        }

        if(this.hasItems()) {
            if(this.canStepLeft()) {
                let idx = (this.state.itemIndex - 1);
                let val = this.state.items[idx];
                this.input.value = val;

                this.setState({
                    itemIndex: idx,
                    value: val,
                });

                if(e) {
                    this.props.onChange(val);
                }
            }
        } else {
            if(this.canStepLeft()) {
                let val = parseInt(this.state.value);
                val = val - 1;
                this.input.value = val;

                this.setState({
                    value: val,
                });

                if(e) {
                    this.props.onChange(val);
                }
            }
        }
    }

    rightClicked(e) {
        if(e) {
            e.preventDefault();
        }

        if(this.hasItems()) {
            if(this.canStepRight()) {
                let idx = this.state.itemIndex + 1;
                let val = this.state.items[idx];
                this.input.value = val;

                this.setState({
                    itemIndex: idx,
                    value: val,
                });

                if(e) {
                    this.props.onChange(val);
                }
            }
        } else {
            if(this.canStepRight()) {
                let val = parseInt(this.state.value);
                val = val + 1;
                this.input.value = val;

                this.setState({
                    value: val,
                });

                if(e) {
                    this.props.onChange(val);
                }
            }
        }
    }

    render() {

        let leftClasses = this.canStepLeft() ? 'stepButton' : 'stepButton stepButton_disabled';
        let rightClasses = this.canStepRight() ? 'stepButton': 'stepButton stepButton_disabled';

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
                <input className="stepInput" value={this.state.value} ref={(input) => this.input = input} readOnly/>
                <a href="#" onMouseDown={this.onDown} onMouseUp={this.onUp} onClick={(e) => {this.rightClicked(e)}}>
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

    canStepRight() {
        return this.hasItems() ? this.state.itemIndex < this.state.items.length - 1 : parseInt(this.state.value) < parseInt(this.props.max);
    }

    canStepLeft() {
        return this.hasItems() ? this.state.itemIndex > 0 : parseInt(this.state.value) > parseInt(this.props.min);
    }
}