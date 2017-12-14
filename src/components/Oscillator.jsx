import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/Oscillator.css';
import Stepper from "./Stepper";

export default class Oscillator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            knobId: `volume-${props.id}`,
            waveform: this.props.defaultWav,
            mix: this.props.defaultMix,
            octave: this.props.defaultOctave,
        };

        this.saveState = this.saveState.bind(this);
        this.handleWaveChanged = this.handleWaveChanged.bind(this);
        this.handleMixChange = this.handleMixChange.bind(this);
    }

    componentDidMount() {

        $(`#${this.state.knobId}`).knob({
            'change' : (v) => {
                this.handleMixChange(v)
            }
        });

        let savedState = JSON.parse(sessionStorage.getItem(this.props.id));
        if(savedState) {
            this.setState(savedState);
        }

    }

    componentDidUpdate() {
        $(`#${this.state.knobId}`).trigger('blur');
    }

    componentWillUnmount() {
        this.saveState();
    }

    saveState() {
        let state = JSON.stringify(this.state);
        sessionStorage.setItem(this.props.id, state);
    }

    render() {

        let waveforms = ['∿', '⊓', '⊿', '∧∧'];

        return (
            <div className="Oscillator">
                <div className="ttl">
                    <h3 className="panel_title">{this.props.id}</h3>
                </div>
                <div className="wav">
                    <p>Waveform</p>
                    <Stepper items={waveforms} default={this.state.waveform} onChange={(val)=>{this.handleWaveChanged(val)}}/>
                </div>
                <div className="mix">
                    <p>Mix</p>
                    <input type="text" value={this.state.mix} id={this.state.knobId} className="knob" data-width="70"
                           data-height="70" data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-max="15" data-angleOffset="180"
                    />
                </div>
                <div className="oct">
                    <p>Octave</p>
                    <Stepper min={0} max={6} default={this.state.octave} onChange={(val) => {this.handleOctaveChanged(val)}}/>
                </div>
            </div>
        );
    }

    handleWaveChanged(val) {
        let waveform = 'sine';

        switch(val) {
            case '∿':
                waveform = 'sine';
                break;
            case '⊓':
                waveform = 'square';
                break;
            case '⊿':
                waveform = 'triangle';
                break;
            case '∧∧':
                waveform = 'sawtooth';
                break;
        }

        this.setState({
            waveform: val,
        }, ()=>{
            this.saveState();
        });

        this.props.onWaveformChanged(waveform);
    }

    handleMixChange(v) {

        let mix = v/100;
        this.setState({
            mix: parseInt(v)
        }, ()=>{
            this.saveState()
        });
        this.props.onMixChanged(mix);
    }

    handleOctaveChanged(val) {

        this.setState({
            octave: val,
        }, ()=>{
            this.saveState();
        });
        this.props.onOctaveChanged(val)
    }
}