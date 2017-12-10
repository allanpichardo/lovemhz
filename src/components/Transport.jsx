import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'
import 'jquery-knob';
import TransportButton from "./TransportButton.jsx";
import Timer from '../utility/Timer';
import Stepper from "./Stepper";

export default class Transport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
            timer: null,
            step: 0,
            bpm: 120,
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

        let timer = this.state.timer;
        let sequenceTime = Transport.bpmToMs(bpm);

        if(timer) {
            timer.interval = sequenceTime;

            let newState = {
                step: this.state.step,
                steps: this.state.steps,
                bpm: this.state.bpm,
                timer : timer,
            };
            this.setState(newState);
        }
    }

    handleStop() {
        this.handleRunningChange(false);
        this.setState({
            isRunning: false,
            step: 0,
        });
    }

    handleTransportToggle = (isStarted) => {
        let timer = this.state.timer;
        let sequenceTime = Transport.bpmToMs(this.state.bpm);

        if(isStarted) {
            timer = new Timer(() => {
                this.handleTick();
            }, sequenceTime);
            timer.start();
        } else {
            if(timer) {
                timer.stop();
                timer = null;
            }
            if(this.props.onPaused) {
                this.props.onPaused();
            }
        }

        let newState = {
            isRunning: true,
            step: this.state.step,
            steps: this.state.steps,
            bpm: this.state.bpm,
            timer : timer,
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
            bpm: this.state.bpm,
            steps: this.state.steps,
            timer : this.state.timer,
        };
        this.setState(newState);
    }
}