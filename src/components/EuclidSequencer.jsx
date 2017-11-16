import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './style/Synth.css';
import './style/EuclidSequencer.css';
import 'jquery-knob';
import EuclidRing from "./EuclidRing";

export default class Sequencer extends Component {

    constructor(props) {
        super(props);

        this.initNoteMatrix = this.initNoteMatrix.bind(this);
        this.handleStepClicked = this.handleStepClicked.bind(this);

        this.state = {
            notes: this.initNoteMatrix()
        };
    }

    initNoteMatrix() {
        let notes = [ [],[],[],[], ];
        for(let i = 0; i < 4; ++i) {
            for(let j = 0; j < this.props.steps; ++j) {
                notes[i][j] = null;
            }
        }
        return notes;
    }

    componentDidMount() {
    }

    handleNoteSelected(id, note) {
        let notes = this.state.notes;

        let idParts = id.split('-');

        notes[idParts[0]][idParts[1]] = note;

        let newState = {
            notes: notes
        };
        this.setState(newState);

        this.props.onNewSequence(notes);
    }

    handleStepClicked(e) {
        console.log(e);
    }

    render() {
        return (
            <div className="Euclid columns">
                <div className="columns">
                    <div className="column">
                        <svg version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink"
                             x="0px"
                             y="0px"
                             width="558.7px"
                             height="558.7px"
                             viewBox="0 0 558.7 558.7"
	                            xmlSpace="preserve">
                            <EuclidRing channel="1" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                            <EuclidRing channel="2" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                            <EuclidRing channel="3" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                            <EuclidRing channel="4" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}