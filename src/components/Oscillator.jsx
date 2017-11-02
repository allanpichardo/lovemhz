import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import './style/Synth.css';
import 'jquery-knob';

export default class Oscillator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
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
                            <select>
                                <option>Sine</option>
                                <option>Square</option>
                                <option>Triangle</option>
                                <option>Sawtooth</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Mix</label>
                    <div className="control">
                        <input type="text" value="75" id={this.state.knobId} className="knob" data-width="50"
                               data-height="50" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Octave</label>
                    <div className="control">
                        <div className="select">
                            <select>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option selected="selected">3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}