import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/Filter.css';

export default class LowpassFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
        }

        this.handleFreqChanged = this.handleFreqChanged.bind(this);
        this.handlePeakChanged = this.handlePeakChanged.bind(this);
    }

    componentDidMount() {
        $(`#peak-lpf-${this.state.id}`).knob({
            'change' : (v) => {
                this.handlePeakChanged(v, false)
            },
            'release' : (v) => {
                this.handlePeakChanged(v, true)
            }
        });
        $(`#freq-lpf-${this.state.id}`).knob({
            'change' : (v) => {
                this.handleFreqChanged(v, false)
            },
            'release' : (v) => {
                this.handleFreqChanged(v, true)
            }
        });
    }

    render() {
        return (
            <div className="Filter">
                <div className="ttl">
                    <h3 className="panel_title">{this.state.id}</h3>
                </div>
                <div className="freq">
                    <p>Freq</p>
                    <input type="text" value="22050" step="10" id={`freq-lpf-${this.state.id}`} className="knob" data-width="70" data-max="22050"
                           data-min="0" data-height="70"  data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                </div>
                <div className="peak">
                    <p>Peak</p>
                    <input type="text" value="1" id={`peak-lpf-${this.state.id}`} className="knob" data-width="50" data-max="50"
                           data-height="50"  data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                </div>
            </div>
        );
    }

    handleFreqChanged(v, shouldSave) {
        this.props.onFreqChanged(v, shouldSave);
    }

    handlePeakChanged(v, shouldSave) {
        this.props.onPeakChanged(v, shouldSave);
    }
}