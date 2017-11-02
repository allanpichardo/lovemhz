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
            sequence: [ [],[],[],[] ]
        };

        this.handleTick = this.handleTick.bind(this);
    }

    componentDidMount() {

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
                            <Oscillator id="osc1"/>
                        </div>
                        <div className="column is-2">
                            <Oscillator id="osc2"/>
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

    handleNewSequence(notes) {
        let newState = {
            step: this.state.step,
            sequence: notes
        };
        this.setState(newState);
    }

    handleTick = (step) => {
        let newState = {
            step: step,
            sequence: this.state.sequence
        };
        this.setState(newState);
    };
}