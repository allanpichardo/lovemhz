import React, { Component } from 'react';
import Transport from "./Transport";
import Calculations from "../utility/Calculations";
import EuclidSequencer from "./EuclidSequencer";
import logo from '../images/logo.svg';
import Tab from "./Tab";
import ControlPanel from "./ControlPanel";
import $ from 'jquery';

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.voices = [[],[]];

        this.state = {
            isRunning: false,
            step: 0,
            bpm: 120,
            sequence: [ [],[],[],[] ],
            osc1: {
                mix: 0.25,
                waveform: 'sine',
                octave: 2,
            },
            osc2: {
                mix: 0.25,
                waveform: 'triangle',
                octave: 4,
            },
            lpf: {
                type: 'lowpass',
                freq: 22050,
                peak: 1
            },
            hpf: {
                type: 'highpass',
                freq: 0,
                peak: 1
            },
            tab: 'sequencer',
        };

        this.handleTick = this.handleTick.bind(this);
        this.playStep = this.playStep.bind(this);
        this.saveState = this.saveState.bind(this);
        this.getVoicesFor = this.getVoicesFor.bind(this);
        this.handleTabSelected = this.handleTabSelected.bind(this);
        this.handleTransportStateChanged = this.handleTransportStateChanged.bind(this);
        this.initializeAudio = this.initializeAudio.bind(this);
        this.handleFreqChangedH = this.handleFreqChangedH.bind(this);
        this.handlePeakChangedH = this.handlePeakChangedH.bind(this);
    }

    componentDidMount() {
        this.initializeAudio();

        let savedState = JSON.parse(sessionStorage.getItem('Synth'));
        if(savedState) {
            this.setState(savedState);

            this.handleTabSelected(document.querySelector(`.${savedState.tab}`));
        }

    }

    initializeAudio() {
        const options = {latencyHint: 'balanced'};
        if ('webkitAudioContext' in window) {
            this.audioContext = new window.webkitAudioContext(options);
        } else {
            this.audioContext = new window.AudioContext(options);
        }
        this.oscGain1 = this.audioContext.createGain();
        this.oscGain2 = this.audioContext.createGain();

        this.hpf1 = this.audioContext.createBiquadFilter();
        this.hpf1.type = this.state.hpf.type;
        this.hpf2 = this.audioContext.createBiquadFilter();
        this.hpf2.type = this.state.hpf.type;

        this.lpf1 = this.audioContext.createBiquadFilter();
        this.lpf1.type = this.state.lpf.type;
        this.lpf2 = this.audioContext.createBiquadFilter();
        this.lpf2.type = this.state.lpf.type;

        this.hpf1.frequency.value = this.state.hpf.freq;
        this.hpf1.Q.value = this.state.hpf.peak;
        this.hpf2.frequency.value = this.state.hpf.freq;
        this.hpf2.Q.value = this.state.hpf.peak;

        this.lpf1.frequency.value = this.state.lpf.freq;
        this.lpf1.Q.value = this.state.lpf.peak;
        this.lpf2.frequency.value = this.state.lpf.freq;
        this.lpf2.Q.value = this.state.lpf.peak;

        this.oscGain1.gain.value = this.state.osc1.mix;
        this.oscGain2.gain.value = this.state.osc2.mix;

        // this.hpf.connect(this.lpf);
        // this.lpf.connect(this.oscGain1);
        // this.lpf.connect(this.oscGain2);

        this.oscGain1.connect(this.audioContext.destination);
        this.oscGain2.connect(this.audioContext.destination);
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

            voice1.connect(this.hpf1);
            voice1.connect(this.lpf2);
            this.lpf1.connect(this.oscGain1);
            this.hpf1.connect(this.oscGain1);

            let voice2 = this.audioContext.createOscillator();

            voice2.type = this.state.osc2.waveform;
            voice2.connect(this.hpf2);
            voice2.connect(this.lpf2);
            this.lpf2.connect(this.oscGain2);
            this.hpf2.connect(this.oscGain2);

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
                channel1[0].start(this.audioContext.currentTime);
                channel1[1].start(this.audioContext.currentTime);
                channel1[0].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
                channel1[1].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
            }
            if(channel2) {
                channel2[0].start(this.audioContext.currentTime);
                channel2[1].start(this.audioContext.currentTime);
                channel2[0].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
                channel2[1].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
            }
            if(channel3) {
                channel3[0].start(this.audioContext.currentTime);
                channel3[1].start(this.audioContext.currentTime);
                channel3[0].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
                channel3[1].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
            }
            if(channel4) {
                channel4[0].start(this.audioContext.currentTime);
                channel4[1].start(this.audioContext.currentTime);
                channel4[0].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
                channel4[1].stop(this.audioContext.currentTime + Transport.bpmToS(this.state.bpm));
            }

        }catch (e) {
            console.log(e);
        }
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
        newState.osc2.octave = octave;
        this.setState(newState);
    }

    handleFreqChangedH(freq, shouldSave) {
        this.hpf1.frequency.value = freq;
        this.hpf2.frequency.value = freq;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.hpf.freq = freq;
            this.setState(newState);
        }
    }

    handlePeakChangedH(peak, shouldSave) {
        this.hpf1.Q.value = peak;
        this.hpf2.Q.value = peak;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.hpf.peak = peak;
            this.setState(newState);
        }
    }

    handleFreqChangedL(freq, shouldSave) {
        this.lpf1.frequency.value = freq;
        this.lpf2.frequency.value = freq;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.lpf.freq = freq;
            this.setState(newState);
        }
    }

    handlePeakChangedL(peak, shouldSave) {
        this.lpf1.Q.value = peak;
        this.lpf2.Q.value = peak;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.lpf.peak = peak;
            this.setState(newState);
        }
    }

    handlePaused() {
        //todo: something when paused
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
                              onWaveformChanged2={(waveform) => {this.handleWaveform2Changed(waveform)}}
                              onMixChanged2={(mix) => {this.handleMix2Changed(mix)}}
                              onOctaveChanged2={(octave) => {this.handleOctave2Changed(octave)}}
                              onFreqChangedH={(freq, shouldSave) => this.handleFreqChangedH(freq, shouldSave)}
                              onPeakChangedH={(peak, shouldSave) => this.handlePeakChangedH(peak, shouldSave)}
                              onFreqChangedL={(freq, shouldSave) => this.handleFreqChangedL(freq, shouldSave)}
                              onPeakChangedL={(peak, shouldSave) => this.handlePeakChangedL(peak, shouldSave)}
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