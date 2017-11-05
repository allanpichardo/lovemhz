import 'bulma/css/bulma.css';
import './style/Synth.css';
import React, { Component } from 'react';
import Oscillator from './Oscillator';
import Transport from "./Transport";
import ADSR from "./ADSR";
import Sequencer from "./Sequencer";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            sequence: [ [],[],[],[] ],
            osc1: {
                mix: 50,
                waveform: 'sine',
                octave: 0,
            },
            osc2: {
                mix: 50,
                waveform: 'sine',
                octave: 0,
            },
            voices: [null, null, null, null],
        };

        this.handleTick = this.handleTick.bind(this);
        this.getStateCopy = this.getStateCopy(this);
        this.handleMix1Changed = this.handleMix1Changed(this);
        this.handleOctave1Changed = this.handleOctave1Changed(this);
        //this.handleWaveform1Changed = this.handleWaveform1Changed(this);
    }

    componentDidMount() {
        if('webkitAudioContext' in window) {
            this.audioContext = new window.webkitAudioContext();
        } else {
            this.audioContext = new window.AudioContext();
        }
        this.oscGain1 = this.audioContext.createGain();
        this.oscGain2 = this.audioContext.createGain();
    }

    getStateCopy() {
        return {
            step: this.state.step,
            sequence: this.state.sequence,
            osc1: {
                mix: this.state.osc1.mix,
                waveform: this.state.osc1.waveform,
                octave: this.state.osc1.octave,
            },
            osc2: {
                mix: this.state.osc2.mix,
                waveform: this.state.osc2.waveform,
                octave: this.state.osc2.octave,
            },
            voices: this.state.voices,
        };
    }

    playTone(freq, oscNumber) {
        let osc = this.audioContext.createOscillator();

        if(oscNumber === 1) {
            osc.connect(this.oscGain1);
            osc.type = this.state.osc1.waveform;
        } else if(oscNumber === 2) {
            osc.connect(this.oscGain2);
            osc.type = this.state.osc2.waveform;
        }

        osc.frequency.value = freq;
        osc.start();

        return osc;
    }

    handleNewSequence(notes) {
        let newState = this.getStateCopy();
        newState.notes = notes;
        this.setState(newState);
    }

    handleTick(step) {
        let newState = this.getStateCopy();
        newState.step = step;
        this.setState(newState);
    }

    handleWaveform1Changed(waveform) {
        let newState = this.getStateCopy();
        newState.osc1.waveform = waveform;
        this.setState(newState);
    }

    handleMix1Changed(mix) {
        let newState = this.getStateCopy();
        newState.osc1.mix = mix;
        this.setState(newState);
    }

    handleOctave1Changed(octave) {
        let newState = this.getStateCopy();
        newState.osc1.octave = octave;
        this.setState(newState);
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-2">
                            <h1 className="title">Love MHz</h1>
                            <h2 className="subtitle">A Synthesizer</h2>
                        </div>
                        <div className="column is-5">
                            <Transport steps="16" onTick={this.handleTick}/>
                        </div>
                        <div className="column is-5">
                            <ADSR/>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-2">
                            <Oscillator id="OSC-1"
                                        onWaveformChanged={(waveform) => {this.handleWaveform1Changed(waveform)}}
                                        onMixChanged={(mix) => {this.handleMix1Changed(mix)}}
                                        onOctaveChanged={(octave) => {this.handleOctave1Changed(octave)}}
                            />
                        </div>
                        <div className="column is-2">
                            <Oscillator id="OSC-2"
                                        onWaveformChanged={(waveform) => {this.handleWaveform1Changed(waveform)}}
                                        onMixChanged={(mix) => {this.handleMix1Changed(mix)}}
                                        onOctaveChanged={(octave) => {this.handleOctave1Changed(octave)}}
                            />
                        </div>
                        <div className="column">
                            <div className="columns">
                                <div className="column">
                                    <LowpassFilter id="LPF"/>
                                </div>
                                <div className="column">
                                    <HighpassFilter id="HPF"/>
                                </div>
                            </div>
                            <Sequencer step={this.state.step}
                                       steps="16"
                                       onNewSequence={(notes)=>{this.handleNewSequence(notes)}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}