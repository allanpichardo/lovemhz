import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import './style/Synth.css';
import 'jquery-knob';

export default class Oscillator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            knobId: `volume-${props.id}`
        }
    }

    componentDidMount() {
        $(`#${this.state.knobId}`).knob();
    }

    render() {
        return (
            <div className="">
                <h3 className="">{this.state.id}</h3>
                <div className="field">
                    <label className="label">Waveform</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={(e) => {this.props.onWaveformChanged(e.target.value)}}>
                                <option value="sine">Sine</option>
                                <option value="square">Square</option>
                                <option value="triangle">Triangle</option>
                                <option value="sawtooth">Sawtooth</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Mix</label>
                    <div className="control">
                        <input type="text" value="75" id={this.state.knobId} className="knob" data-width="50"
                               data-height="50" data-displayInput="false" data-angleOffset="180"
                                onChange={(e) => {this.props.onMixChanged(e.target.value)}}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Octave</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={(e) => {this.props.onOctaveChanged(e.target.value)}}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3" selected="selected">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}