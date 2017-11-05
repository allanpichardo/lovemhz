import 'bulma/css/bulma.css';
import './style/Synth.css';
import React, { Component } from 'react';
import Oscillator from './Oscillator';
import Transport from "./Transport";
import ADSR from "./ADSR";
import Sequencer from "./Sequencer";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";
import Calculations from "../utility/Calculations";

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            sequence: [ [],[],[],[] ],
            osc1: {
                mix: 0.5,
                waveform: 'sine',
                octave: 3,
            },
            osc2: {
                mix: 0.5,
                waveform: 'sine',
                octave: 3,
            },
            voices: [[],[]],
        };

        this.handleTick = this.handleTick.bind(this);
        this.getStateCopy = this.getStateCopy.bind(this);
        this.playStep = this.playStep.bind(this);
        this.resetAllVoices = this.resetAllVoices.bind(this);
    }

    componentDidMount() {
        const options = {latencyHint: 'balanced'};
        if('webkitAudioContext' in window) {
            this.audioContext = new window.webkitAudioContext(options);
        } else {
            this.audioContext = new window.AudioContext(options);
        }
        this.oscGain1 = this.audioContext.createGain();
        this.oscGain2 = this.audioContext.createGain();

        this.oscGain1.connect(this.audioContext.destination);
        this.oscGain2.connect(this.audioContext.destination);
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

    playStep() {
        for(let i = 0; i < 4; ++i) {
            let notes = this.state.sequence[i][this.state.step];
            if(notes) {
                let voice = this.audioContext.createOscillator();
                voice.type = this.state.osc1.waveform;
                voice.connect(this.oscGain1);
                this.oscGain1.gain.value = this.state.osc1.mix;

                let newState = this.getStateCopy();
                newState.voices[0][i] = voice;
                this.setState(newState);

                voice.frequency.value = Calculations.shiftToOctave(notes, this.state.osc1.octave);
                try {
                    voice.start();
                }catch (e) {
                    console.log(e);
                }
            }
        }
        for(let i = 0; i < 4; ++i) {
            let notes = this.state.sequence[i][this.state.step];
            if(notes) {
                let voice = this.audioContext.createOscillator();
                voice.type = this.state.osc2.waveform;
                voice.connect(this.oscGain2);
                this.oscGain2.gain.value = this.state.osc2.mix;

                let newState = this.getStateCopy();
                newState.voices[1][i] = voice;
                this.setState(newState);

                voice.frequency.value = Calculations.shiftToOctave(notes, this.state.osc2.octave);
                try {
                    voice.start();
                }catch (e) {
                    console.log(e);
                }
            }
        }
    }

    resetAllVoices() {
        this.state.voices.forEach((osc) => {
            osc.forEach((voice) => {
                if(voice) {
                    try {
                        voice.stop();
                    } catch (e) {
                        //ignore
                    }
                }
            });
        });
    }

    handleNewSequence(notes) {
        let newState = this.getStateCopy();
        newState.sequence = notes;
        this.setState(newState);
    }

    handleTick(step) {
        let newState = this.getStateCopy();
        newState.step = step;
        this.setState(newState);

        this.resetAllVoices();
        this.playStep()
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