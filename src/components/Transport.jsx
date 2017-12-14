import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'
import 'jquery-knob';
import TransportButton from "./TransportButton.jsx";
import * as Timer from 'audio-context-timers';
import Stepper from "./Stepper";

export default class Transport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            intervalId: null,
            isRunning: false,
            step: 0,
            bpm: 180,
            steps: this.props.steps ? this.props.steps : 16,
        };

        this.handleTick = this.handleTick.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.incrementStep = this.incrementStep.bind(this);
        this.handleRunningChange = this.handleRunningChange.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="transport">
                <TransportButton onTransportToggle={this.handleTransportToggle} onStop={this.handleStop}/>
                <div className="tempoBox">
                    <span>Tempo</span><Stepper default={this.state.bpm} min={1} max={620} onChange={(newTempo) => {this.handleTempoChange(newTempo)}}/>
                </div>
            </div>
        );
    }

    handleTempoChange(bpm) {

        this.setState({
            bpm: bpm,
        });

        let sequenceTime = Transport.bpmToMs(bpm);

        if(this.state.intervalId) {
            Timer.clearInterval(this.state.intervalId);
            let intervalId = Timer.setInterval(() => {
                this.handleTick();
            }, sequenceTime);

            this.setState({
                intervalId: intervalId
            })
        }
    }

    handleStop() {
        this.handleTransportToggle(false);
        this.handleRunningChange(false);
        this.setState({
            isRunning: false,
            step: 0,
        });
    }

    handleTransportToggle = (isStarted) => {
        let sequenceTime = Transport.bpmToMs(this.state.bpm);

        if(isStarted) {
            let intervalId = Timer.setInterval(() => {
                this.handleTick();
            }, sequenceTime);

            this.setState({
                intervalId: intervalId
            });
        } else {
            if(this.state.intervalId !== null) {
                Timer.clearInterval(this.state.intervalId);

                this.setState({
                    intervalId: null,
                });
            }
        }

        let newState = {
            isRunning: true,
        };
        this.setState(newState);

        this.handleRunningChange(true);
    };

    handleRunningChange(isRunning) {
        this.props.onRunningChanged(isRunning);
    }

    static bpmToMs(bpm) {
        return 60000 / bpm / 2;
    }

    static msToBpm(ms) {
        return 60000 / ms;
    }

    static bpmToS(bpm) {
        return Transport.bpmToMs(bpm) / 1000;
    }


    handleTick() {
        if(this.props.onTick) {
            this.props.onTick(this.state.step)
        }
        this.incrementStep();
    }

    incrementStep() {
        let step = (this.state.step + 1) % this.state.steps;

        let newState = {
            step: step,
        };
        this.setState(newState);
    }
}