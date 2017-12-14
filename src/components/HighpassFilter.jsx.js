import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/Filter.css';

export default class HighpassFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            peakKnobId: `peak-hpf-${this.props.id}`,
            freqKnobId: `freq-hpf-${this.props.id}`,
            id : props.id,
            frequency: 0,
            peak: 1,
        };

        this.handleFreqChanged = this.handleFreqChanged.bind(this);
        this.handlePeakChanged = this.handlePeakChanged.bind(this);
        this.saveState = this.saveState.bind(this);
    }

    componentDidMount() {
        $('#'+this.state.peakKnobId).knob({
            'change' : (v) => {
                this.handlePeakChanged(v, false)
            },
            'release' : (v) => {
                this.handlePeakChanged(v, true)
            }
        });
        $('#'+this.state.freqKnobId).knob({
            'change' : (v) => {
                this.handleFreqChanged(v, false)
            },
            'release' : (v) => {
                this.handleFreqChanged(v, true)
            }
        });

        let savedState = JSON.parse(sessionStorage.getItem(this.props.id));
        if(savedState) {
            this.setState(savedState);
        }
    }

    componentDidUpdate() {
        $('#'+this.state.freqKnobId).trigger('blur');
        $('#'+this.state.peakKnobId).trigger('blur');
    }

    componentWillUnmount() {
        this.saveState();
    }

    saveState() {
        let state = JSON.stringify(this.state);
        sessionStorage.setItem(this.props.id, state);
    }

    render() {
        return (
            <div className="Filter">
                <div className="ttl"><h3 className="panel_title">{this.state.id}</h3></div>
                <div className="freq">
                    <p>Freq</p>
                    <input type="text" value={this.state.frequency} step="1" id={this.state.freqKnobId} className="knob" data-width="70" data-max="200"
                           data-min="0" data-height="70" data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                </div>
                <div className="peak">
                    <p>Peak</p>
                    <input type="text" value={this.state.peak} step="1" id={this.state.peakKnobId} className="knob" data-width="50" data-max="25"
                           data-height="50"  data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                </div>
            </div>
        );
    }

    handleFreqChanged(v, shouldSave) {
        this.setState({
            frequency: v,
        });
        this.props.onFreqChanged(v, shouldSave);
    }

    handlePeakChanged(v, shouldSave) {
        this.setState({
            peak: v,
        });
        this.props.onPeakChanged(v, shouldSave);
    }
}