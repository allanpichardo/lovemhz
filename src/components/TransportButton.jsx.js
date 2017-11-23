import React, {Component} from 'react';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css'
import 'jquery-knob';
import './style/Synth.css';

export default class TransportButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isStarted: false
        };

        this.handlePlayClicked = this.handlePlayClicked.bind(this);
        this.handleStopClicked = this.handleStopClicked.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                    <a id="playButton" className="transportButton playButton" onClick={this.handlePlayClicked}>
                            <i id="playButtonIcon" className="fa fa-play"/>
                    </a>
                    <a id="stopButton" className="transportButton stopButton" onClick={this.handleStopClicked}>
                            <i id="stopButtonIcon" className="fa fa-stop"/>
                    </a>
            </div>
        );
    }

    handlePlayClicked() {
        let newToggleState = !this.state.isStarted;

        this.toggleButtonState(newToggleState);

        let newState = {
            isStarted: newToggleState
        }
        this.setState(newState);

        this.props.onTransportToggle(newToggleState);
    }

    handleStopClicked() {
        let newToggleState = false;

        this.toggleButtonState(newToggleState);

        let newState = {
            isStarted: newToggleState
        }
        this.setState(newState);

        this.props.onTransportToggle(newToggleState);
        this.props.onStop();
    }

    toggleButtonState(isStarted) {
        $('#playButton').toggleClass('playButton', !isStarted);
        $('#playButton').toggleClass('pauseButton', isStarted);
        $('#playButtonIcon').toggleClass('fa-play', !isStarted);
        $('#playButtonIcon').toggleClass('fa-pause', isStarted);
    }

}