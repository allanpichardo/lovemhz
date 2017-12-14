import React, { Component } from 'react';
import Transport from "./Transport";
import Calculations from "../utility/Calculations";
import EuclidSequencer from "./EuclidSequencer";
import logo from '../images/logo.svg';
import Tab from "./Tab";
import ControlPanel from "./ControlPanel";
import ADSREnvelope from 'adsr-envelope';

export default class Synth extends Component {

    constructor(props) {
        super(props);

        this.defaultState = {
            isRunning: false,
            step: 0,
            bpm: 180,
            sequence: [ [],[],[],[] ],
            osc1: {
                mix: 0.10,
                waveform: 'sine',
                octave: 2,
            },
            osc2: {
                mix: 0.10,
                waveform: 'triangle',
                octave: 4,
            },
            lpf: {
                type: 'lowpass',
                freq: 8000,
                peak: 1,
                detune: 0,
            },
            hpf: {
                type: 'highpass',
                freq: 0,
                peak: 1,
                detune: 0,
            },
            adsr: {
                attackTime: 0.25,
                decayTime: 0.25,
                sustainLevel: 0.2,
                releaseTime: .25,
                gateTime: .6,
                peakLevel: 0.15,
                releaseCurve: "exp",
            },
            tab: 'sequencer',
        };

        this.state = {
            isRunning: false,
            step: 0,
            bpm: 200,
            sequence: [ [],[],[],[] ],
            osc1: {
                mix: 0.10,
                waveform: 'sine',
                octave: 2,
            },
            osc2: {
                mix: 0.10,
                waveform: 'triangle',
                octave: 4,
            },
            lpf: {
                type: 'lowpass',
                freq: 8000,
                peak: 1,
                detune: 0,
            },
            hpf: {
                type: 'highpass',
                freq: 0,
                peak: 1,
                detune: 0,
            },
            adsr: {
                attackTime: 0.25,
                decayTime: 0.25,
                sustainLevel: 0.2,
                releaseTime: .25,
                gateTime: .6,
                peakLevel: 0.15,
                releaseCurve: "exp",
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
        this.makeNote = this.makeNote.bind(this);
        this.handleAttackChanged = this.handleAttackChanged.bind(this);
        this.handleDecayChanged = this.handleDecayChanged.bind(this);
        this.handleSustainChanged = this.handleSustainChanged.bind(this);
        this.handleReleaseChanged = this.handleReleaseChanged.bind(this);
    }

    componentDidMount() {
        this.initializeAudio();

        let savedState = JSON.parse(sessionStorage.getItem('Synth'));
        if(savedState && savedState !== this.defaultState) {
            this.setState(savedState, () => {

            });
        }

    }

    componentDidUpdate() {
        this.handleTabSelected(document.querySelector(`.${this.state.tab}`), true);
    }

    initializeAudio() {
        const options = {
            latencyHint: 'balanced',
            sampleRate: 44100,
        };

        if ('webkitAudioContext' in window) {
            this.audioContext = new window.webkitAudioContext(options);
        } else {
            this.audioContext = new window.AudioContext(options);
        }
        this.oscGain1 = this.audioContext.createGain();
        this.oscGain2 = this.audioContext.createGain();

        this.hpf1 = this.audioContext.createBiquadFilter();
        this.hpf1.type = this.state.hpf.type;
        this.hpf1.detune.setValueAtTime(this.state.hpf.detune, this.audioContext.currentTime);
        this.hpf2 = this.audioContext.createBiquadFilter();
        this.hpf2.type = this.state.hpf.type;
        this.hpf2.detune.setValueAtTime(this.state.hpf.detune, this.audioContext.currentTime);

        this.lpf1 = this.audioContext.createBiquadFilter();
        this.lpf1.type = this.state.lpf.type;
        this.lpf1.detune.setValueAtTime(this.state.lpf.detune, this.audioContext.currentTime);
        this.lpf2 = this.audioContext.createBiquadFilter();
        this.lpf2.type = this.state.lpf.type;
        this.lpf2.detune.setValueAtTime(this.state.lpf.detune, this.audioContext.currentTime);

        this.adsr = new ADSREnvelope(this.state.adsr);

        this.hpf1.frequency.setValueAtTime(this.state.hpf.freq, this.audioContext.currentTime);
        this.hpf1.Q.value = this.state.hpf.peak;
        this.hpf2.frequency.setValueAtTime(this.state.hpf.freq, this.audioContext.currentTime);
        this.hpf2.Q.value = this.state.hpf.peak;

        this.lpf1.frequency.setValueAtTime(this.state.lpf.freq, this.audioContext.currentTime);
        this.lpf1.Q.value = this.state.lpf.peak;
        this.lpf2.frequency.setValueAtTime(this.state.lpf.freq, this.audioContext.currentTime);
        this.lpf2.Q.value = this.state.lpf.peak;

        this.oscGain1.gain.value = this.state.osc1.mix;
        this.oscGain2.gain.value = this.state.osc2.mix;

        this.oscGain1.connect(this.audioContext.destination);
        this.oscGain2.connect(this.audioContext.destination);
    }

    componentWillUnmount() {
        this.saveState(this.state);
    }

    saveState(state) {
        if(state !== this.defaultState) {
            let stateJson = JSON.stringify(state);
            sessionStorage.setItem('Synth', stateJson);
        }
    }

    getVoicesFor(channel) {
        let notes = this.state.sequence[channel - 1][this.state.step];
        if(notes) {

            let voice1 = this.audioContext.createOscillator();
            voice1.type = this.state.osc1.waveform;

            voice1.connect(this.hpf1);
            this.hpf1.connect(this.lpf1);
            this.lpf1.connect(this.oscGain1);

            let voice2 = this.audioContext.createOscillator();

            voice2.type = this.state.osc2.waveform;
            voice2.connect(this.hpf2);
            this.hpf2.connect(this.lpf2);
            this.lpf2.connect(this.oscGain2);

            let noteFreq = Calculations.textNoteToFrequency(notes);
            voice1.frequency.setValueAtTime(Calculations.shiftToOctave(noteFreq, this.state.osc1.octave), this.audioContext.currentTime);
            voice2.frequency.setValueAtTime(Calculations.shiftToOctave(noteFreq, this.state.osc2.octave), this.audioContext.currentTime);

            return [voice1, voice2];
        }

        return null;
    }

    makeNote(voices) {
        if(voices) {

            let envelope11 = this.adsr.clone();
            let envelope12 = this.adsr.clone();

            envelope11.peakLevel = this.state.osc1.mix;
            envelope11.gateTime = Transport.bpmToS(this.state.bpm);

            envelope12.peakLevel = this.state.osc2.mix;
            envelope12.gateTime = Transport.bpmToS(this.state.bpm);

            envelope11.applyTo(this.oscGain1.gain, this.audioContext.currentTime);
            envelope12.applyTo(this.oscGain2.gain, this.audioContext.currentTime);

            voices[0].start(this.audioContext.currentTime);
            voices[1].start(this.audioContext.currentTime);

            this.oscGain1.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.oscGain2.gain.cancelScheduledValues(this.audioContext.currentTime);

            envelope11.applyTo(this.oscGain1.gain, this.audioContext.currentTime);
            envelope12.applyTo(this.oscGain2.gain, this.audioContext.currentTime);

            voices[0].stop(this.audioContext.currentTime + envelope11.duration);
            voices[1].stop(this.audioContext.currentTime + envelope12.duration);

            voices[0].onended = () => {
                voices[0] = null;
            };
            voices[1].onended = () => {
                voices[1] = null;
            };
        }
    }

    playStep() {
        try {
            let channel1 = this.getVoicesFor(1);
            let channel2 = this.getVoicesFor(2);
            let channel3 = this.getVoicesFor(3);
            let channel4 = this.getVoicesFor(4);

            this.makeNote(channel1);
            this.makeNote(channel2);
            this.makeNote(channel3);
            this.makeNote(channel4);

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

    handleMix1Changed(mix, shouldSave) {
        this.oscGain1.gain.value = mix;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.osc1.mix = mix;
            this.setState(newState);
        }
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

    handleMix2Changed(mix, shouldSave) {
        this.oscGain2.gain.value = mix;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.osc2.mix = mix;
            this.setState(newState);
        }
    }

    handleOctave2Changed(octave) {
        let newState = Object.assign({}, this.state);
        newState.osc2.octave = octave;
        this.setState(newState);
    }

    handleFreqChangedH(freq, shouldSave) {
        this.hpf1.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        this.hpf2.frequency.setValueAtTime(freq, this.audioContext.currentTime);

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.hpf.freq = freq;
            this.setState(newState);
        }
    }

    handlePeakChangedH(peak, shouldSave) {
        this.hpf1.Q.setValueAtTime(peak, this.audioContext.currentTime);
        this.hpf2.Q.setValueAtTime(peak, this.audioContext.currentTime);

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.hpf.peak = peak;
            this.setState(newState);
        }
    }

    handleFreqChangedL(freq, shouldSave) {
        this.lpf1.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        this.lpf2.frequency.setValueAtTime(freq, this.audioContext.currentTime);

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.lpf.freq = freq;
            this.setState(newState);
        }
    }

    handlePeakChangedL(peak, shouldSave) {
        this.lpf1.Q.setValueAtTime(peak, this.audioContext.currentTime);
        this.lpf2.Q.setValueAtTime(peak, this.audioContext.currentTime);

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.lpf.peak = peak;
            this.setState(newState);
        }
    }

    handlePaused() {
        //todo: something when paused
    }

    handleTabSelected(element, skipUpdate) {
        element.classList.add('tab_selected');

        if(!skipUpdate) {
            let newState = Object.assign({}, this.state);
            newState.tab = element.classList[1];
            this.setState(newState);

            this.saveState(newState);
        }
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

    handleAttackChanged(value, shouldSave) {
        this.adsr.attackTime = value;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.adsr.attackTime = value;
            this.setState(newState);
        }
    }

    handleDecayChanged(value, shouldSave) {
        this.adsr.decayTime = value;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.adsr.decayTime = value;
            this.setState(newState);
        }
    }

    handleSustainChanged(value, shouldSave) {
        this.adsr.sustainTime = value;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.adsr.sustainTime = value;
            this.setState(newState);
        }
    }

    handleReleaseChanged(value, shouldSave) {
        this.adsr.releaseTime = value;

        if(shouldSave) {
            let newState = Object.assign({}, this.state);
            newState.adsr.releaseTime = value;
            this.setState(newState);
        }
    }

    getControlsTab() {
        return (
            <div className="content">
                <ControlPanel onWaveformChanged1={(waveform) => {this.handleWaveform1Changed(waveform)}}
                              onMixChanged1={(mix, shouldSave) => {this.handleMix1Changed(mix, shouldSave)}}
                              onOctaveChanged1={(octave) => {this.handleOctave1Changed(octave)}}
                              onWaveformChanged2={(waveform) => {this.handleWaveform2Changed(waveform)}}
                              onMixChanged2={(mix, shouldSave) => {this.handleMix2Changed(mix, shouldSave)}}
                              onOctaveChanged2={(octave) => {this.handleOctave2Changed(octave)}}
                              onFreqChangedH={(freq, shouldSave) => this.handleFreqChangedH(freq, shouldSave)}
                              onPeakChangedH={(peak, shouldSave) => this.handlePeakChangedH(peak, shouldSave)}
                              onFreqChangedL={(freq, shouldSave) => this.handleFreqChangedL(freq, shouldSave)}
                              onPeakChangedL={(peak, shouldSave) => this.handlePeakChangedL(peak, shouldSave)}
                              onAttackChanged={(v, shouldSave) => {this.handleAttackChanged(v, shouldSave)}}
                              onDecayChanged={(v, shouldSave) => {this.handleDecayChanged(v, shouldSave)}}
                              onSustainChanged={(v, shouldSave) => {this.handleSustainChanged(v, shouldSave)}}
                              onReleaseChanged={(v, shouldSave) => {this.handleReleaseChanged(v, shouldSave)}}
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