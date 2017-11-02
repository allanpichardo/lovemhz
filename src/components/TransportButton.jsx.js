import React, {Component} from 'react';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css'
import 'bulma/css/bulma.css';
import 'jquery-knob';

export default class TransportButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isStarted: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <a id="transportButton" className="button is-success" onClick={this.handleClick}>
                <span className="icon is-small">
                    <i id="buttonIcon" className="fa fa-play"/>
                </span>
            </a>
        );
    }

    handleClick() {
        let newToggleState = !this.state.isStarted;

        this.toggleButtonState(newToggleState);

        let newState = {
            isStarted: newToggleState
        }
        this.setState(newState);

        this.props.onTransportToggle(newToggleState);
    }

    toggleButtonState(isStarted) {
        $('#transportButton').toggleClass('is-success', !isStarted);
        $('#transportButton').toggleClass('is-danger', isStarted);
        $('#buttonIcon').toggleClass('fa-play', !isStarted);
        $('#buttonIcon').toggleClass('fa-pause', isStarted);
    }

}