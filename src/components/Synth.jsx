import React, { Component } from 'react';
import Transport from "./Transport";
import Calculations from "../utility/Calculations";
import EuclidSequencer from "./EuclidSequencer";
import logo from '../images/logo.svg';
import Tab from "./Tab";
import ControlPanel from "./ControlPanel";

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.voices = [[],[]];

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
            tab: 'sequencer',
        };

        this.handleTick = this.handleTick.bind(this);
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

        let savedState = JSON.parse(sessionStorage.getItem('Synth'));
        if(savedState) {
            this.setState(savedState);
        }

        this.handleTabSelected(document.querySelector(`.${savedState.tab}`));
    }

    componentWillUnmount() {
        this.saveState(this.state);
    }

    saveState(state) {
        let stateJson = JSON.stringify(state);
        sessionStorage.setItem('Synth', stateJson);
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

            let noteFreq = Calculations.textNoteToFrequency(notes);
            voice1.frequency.value = Calculations.shiftToOctave(noteFreq, this.state.osc1.octave);
            voice2.frequency.value = Calculations.shiftToOctave(noteFreq, this.state.osc2.octave);

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

            if(channel1) {
                channel1[0].start();
                channel1[1].start();

                this.voices[0][1] = channel1[0];
                this.voices[1][1] = channel1[1];
            }
            if(channel2) {
                channel2[0].start();
                channel2[1].start();

                this.voices[0][2] = channel2[0];
                this.voices[1][2] = channel2[1];
            }
            if(channel3) {
                channel3[0].start();
                channel3[1].start();

                this.voices[0][3] = channel3[0];
                this.voices[1][3] = channel3[1];
            }
            if(channel4) {
                channel4[0].start();
                channel4[1].start();

                this.voices[0][4] = channel4[0];
                this.voices[1][4] = channel4[1];
            }

        }catch (e) {
            console.log(e);
        }
    }

    resetAllVoices() {
        this.voices.forEach((osc, o) => {
            osc.forEach((voice, v) => {
                if(voice) {
                    try {
                        this.voices[o][v].stop();
                        this.voices[o][v] = null;
                    } catch (e) {
                        //ignore
                    }
                }
            });
        });
    }

    handleNewSequence(notes) {
        let newState = Object.assign({}, this.state);
        newState.sequence = notes;
        this.setState(newState);
    }

    handleTick(step) {
        let newState = Object.assign({}, this.state);
        newState.step = step;
        this.setState(newState);

        this.resetAllVoices();
        this.playStep()
    }

    handleWaveform1Changed(waveform) {
        let newState = Object.assign({}, this.state);
        newState.osc1.waveform = waveform;
        this.setState(newState);
    }

    handleMix1Changed(mix) {
        let newState = Object.assign({}, this.state);
        newState.osc1.mix = mix;
        this.setState(newState);

        this.oscGain1.gain.value = mix;
    }

    handleOctave1Changed(octave) {
        let newState = Object.assign({}, this.state);
        newState.osc1.octave = octave;
        this.setState(newState);
    }

    handleWaveform2Changed(waveform) {
        let newState = Object.assign({}, this.state);
        newState.osc2.waveform = waveform;
        this.setState(newState);
    }

    handleMix2Changed(mix) {
        let newState = Object.assign({}, this.state);
        newState.osc2.mix = mix;
        this.setState(newState);

        this.oscGain2.gain.value = mix;
    }

    handleOctave2Changed(octave) {
        let newState = Object.assign({}, this.state);
        newState.osc1.octave = octave;
        this.setState(newState);
    }

    handlePaused() {
        this.resetAllVoices();
    }

    handleTabSelected(element) {
        element.classList.add('tab_selected');

        let newState = Object.assign({}, this.state);
        newState.tab = element.classList[1];
        this.setState(newState);

        this.saveState(newState);
    }

    handleTransportStateChanged(isRunning) {
        if(!isRunning) {
            this.resetAllVoices();
            this.setState({
                step: 0,
            });
        }

        this.setState({
            isRunning: isRunning,
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
            <EuclidSequencer initialSequence={this.state.sequence} step={this.state.step} steps="8" isRunning={this.state.isRunning} onNewSequence={(notes)=>{this.handleNewSequence(notes)}}/>
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
                content = this.getSequencerTab();
                break;
        }

        return (
            <div className="wrapper">
                <Transport onPaused={()=>{this.handlePaused()}} steps={8} onTick={(step) => {this.handleTick(step)}} onRunningChanged={(isRunning)=>{this.handleTransportStateChanged(isRunning)}}/>
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