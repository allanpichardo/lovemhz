import 'bulma/css/bulma.css';
import './style/Synth.css';
import React, { Component } from 'react';
import Oscillator from './Oscillator';
import Transport from "./Transport";
import ADSR from "./ADSR";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";
import Calculations from "../utility/Calculations";
import EuclidSequencer from "./EuclidSequencer";

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
        this.getVoicesFor = this.getVoicesFor.bind(this);
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

    getVoicesFor(channel) {
        let notes = this.state.sequence[channel - 1][this.state.step];
        if(notes) {
            let voice1 = this.audioContext.createOscillator();
            voice1.type = this.state.osc1.waveform;
            voice1.connect(this.oscGain1);

            let voice2 = this.audioContext.createOscillator();
            voice2.type = this.state.osc2.waveform;
            voice2.connect(this.oscGain2);

            voice1.frequency.value = Calculations.shiftToOctave(notes, this.state.osc1.octave);
            voice2.frequency.value = Calculations.shiftToOctave(notes, this.state.osc2.octave);

            return [voice1, voice2];
        }

        return null;
    }

    playStep() {
        try {
            let channel1 = this.getVoicesFor(1);
            let channel2 = this.getVoicesFor(2);
            let channel3 = this.getVoicesFor(3);
            let channel4 = this.getVoicesFor(4);

            let newState = this.getStateCopy();

            if(channel1) {
                channel1[0].start();
                channel1[1].start();

                newState.voices[0][1] = channel1[0];
                newState.voices[1][1] = channel1[1];
            }
            if(channel2) {
                channel2[0].start();
                channel2[1].start();

                newState.voices[0][2] = channel2[0];
                newState.voices[1][2] = channel2[1];
            }
            if(channel3) {
                channel3[0].start();
                channel3[1].start();

                newState.voices[0][3] = channel3[0];
                newState.voices[1][3] = channel3[1];
            }
            if(channel4) {
                channel4[0].start();
                channel4[1].start();

                newState.voices[0][4] = channel4[0];
                newState.voices[1][4] = channel4[1];
            }

            this.setState(newState);
        }catch (e) {
            console.log(e);
        }
    }

    resetAllVoices() {
        this.state.voices.forEach((osc, o) => {
            osc.forEach((voice, v) => {
                if(voice) {
                    try {
                        this.state.voices[o][v].stop();
                        this.state.voices[o][v] = null;
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

        this.oscGain1.gain.value = mix;
    }

    handleOctave1Changed(octave) {
        let newState = this.getStateCopy();
        newState.osc1.octave = octave;
        this.setState(newState);
    }

    handleWaveform2Changed(waveform) {
        let newState = this.getStateCopy();
        newState.osc2.waveform = waveform;
        this.setState(newState);
    }

    handleMix2Changed(mix) {
        let newState = this.getStateCopy();
        newState.osc2.mix = mix;
        this.setState(newState);

        this.oscGain2.gain.value = mix;
    }

    handleOctave2Changed(octave) {
        let newState = this.getStateCopy();
        newState.osc1.octave = octave;
        this.setState(newState);
    }

    handlePaused() {
        this.resetAllVoices();
    }

    getControlsTab() {
        return (
            <div>
                <div className="columns">

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
                                    onWaveformChanged={(waveform) => {this.handleWaveform2Changed(waveform)}}
                                    onMixChanged={(mix) => {this.handleMix2Changed(mix)}}
                                    onOctaveChanged={(octave) => {this.handleOctave2Changed(octave)}}
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

                    </div>
                </div>
            </div>
        )
    }

    getSequencerTab() {
        return (
            <EuclidSequencer step={this.state.step}
                         steps="8"
                         onNewSequence={(notes)=>{this.handleNewSequence(notes)}}
        />
        );
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="column">
                                <h1 className="title">Love MHz</h1>
                                <h2 className="subtitle">A Synthesizer</h2>
                            </div>
                            <div className="column">
                                <Transport steps="8" onTick={this.handleTick} onPaused={() => {this.handlePaused()}}/>
                            </div>
                        </div>
                    </div>
                    <div className="tabs">
                    <ul>
                        <li className="is-active"><a>Controls</a></li>
                        <li><a>Sequencer</a></li>
                        <li><a>Storage</a></li>
                    </ul>
                    </div>

                </div>
            </div>
        );
    }

}