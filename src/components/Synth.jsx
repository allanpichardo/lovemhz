import React, { Component } from 'react';
import Oscillator from './Oscillator';
import Transport from "./Transport";
import ADSR from "./ADSR";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";
import Calculations from "../utility/Calculations";
import EuclidSequencer from "./EuclidSequencer";
import logo from '../images/logo.svg';
import Tab from "./Tab";
import ControlPanel from "./ControlPanel";

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
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
            tab: 'sequencer',
        };

        this.handleTick = this.handleTick.bind(this);
        this.getStateCopy = this.getStateCopy.bind(this);
        this.playStep = this.playStep.bind(this);
        this.resetAllVoices = this.resetAllVoices.bind(this);
        this.getVoicesFor = this.getVoicesFor.bind(this);
        this.handleTabSelected = this.handleTabSelected.bind(this);
        this.handleTransportStateChanged = this.handleTransportStateChanged.bind(this);
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

        this.handleTabSelected(document.querySelector('.sequencer'));
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

    handleTabSelected(element) {
        element.classList.add('tab_selected');
        console.log(element);
        this.setState({
            tab: element.classList[1]
        });
    }

    handleTransportStateChanged(isRunning) {
        this.setState({
            isRunning: isRunning
        });
    }

    getControlsTab() {
        return (
            <div className="content">
                <ControlPanel onWaveformChanged1={(waveform) => {this.handleWaveform1Changed(waveform)}}
                              onMixChanged1={(mix) => {this.handleMix1Changed(mix)}}
                              onOctaveChanged1={(octave) => {this.handleOctave1Changed(octave)}}
                              onWaveformChanged2={(waveform) => {this.handleWaveform1Changed(waveform)}}
                              onMixChanged2={(mix) => {this.handleMix1Changed(mix)}}
                              onOctaveChanged2={(octave) => {this.handleOctave1Changed(octave)}}
                />
            </div>
        )
    }

    getSequencerTab() {
        return (
            <div className="content">
            <EuclidSequencer step={this.state.step} steps="8" isRunning={this.state.isRunning} onNewSequence={(notes)=>{this.handleNewSequence(notes)}}/>
            </div>
        );
    }

    render() {

        let content;
        switch(this.state.tab) {
            case 'sequencer':
                content = this.getSequencerTab();
                break;
            case 'controls':
                content = this.getControlsTab();
                break;
            default:
                content = this.getSequencerTab()
                break;
        }

        return (
            <div className="wrapper">
                <Transport onRunningChanged={(isRunning)=>{this.handleTransportStateChanged(isRunning)}}/>
                <div className="branding">
                    <img src={logo}/>
                </div>
                <Tab tabClass="sequencer" title="Sequencer" onTabSelected={(element)=>{this.handleTabSelected(element)}}/>
                <Tab tabClass="controls" title="Controls" onTabSelected={(element)=>{this.handleTabSelected(element)}}/>
                {content}
            </div>
        );
    }

}