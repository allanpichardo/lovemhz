import React, {Component} from 'react';
import './style/ControlPanel.css';
import Oscillator from "./Oscillator";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";
import ADSR from "./ADSR";

export default class ControlPanel extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        return (
            <div className="ControlPanel">
                <div className="osc1">
                    <Oscillator id="OSC-1"
                                defaultWav="∿" defaultMix={25} defaultOctave={2}
                                onWaveformChanged={(waveform) => {this.props.onWaveformChanged1(waveform)}}
                                onMixChanged={(mix) => {this.props.onMixChanged1(mix)}}
                                onOctaveChanged={(octave) => {this.props.onOctaveChanged1(octave)}}
                    />
                </div>
                <div className="osc2">
                    <Oscillator id="OSC-2"
                                defaultWav="⊿" defaultMix={25} defaultOctave={4}
                                onWaveformChanged={(waveform) => {this.props.onWaveformChanged2(waveform)}}
                                onMixChanged={(mix) => {this.props.onMixChanged2(mix)}}
                                onOctaveChanged={(octave) => {this.props.onOctaveChanged2(octave)}}
                    />
                </div>
                <div className="lpf">
                    <LowpassFilter id="LPF"/>
                </div>
                <div className="hpf">
                    <HighpassFilter id="HPF" onFreqChanged={(freq) => this.props.onFreqChangedH(freq)} onPeakChanged={(peak) => this.props.onPeakChangedH(peak)}/>
                </div>
                <div className="adsr">
                    <ADSR id="ADSR"/>
                </div>
            </div>
        );
    }
}