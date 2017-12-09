import React, { Component } from 'react';
import './style/EuclidSequencer.css';
import 'jquery-knob';
import EuclidRing from "./EuclidRing";
import Stepper from "./Stepper";

export default class Sequencer extends Component {

    constructor(props) {
        super(props);

        this.initNoteMatrix = this.initNoteMatrix.bind(this);
        this.handleStepClicked = this.handleStepClicked.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleOnsetChange = this.handleOnsetChange.bind(this);
        this.handleOffsetChange = this.handleOffsetChange.bind(this);

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

    handleNoteChange(track, note) {
        //todo: acknowledge note change for this track
    }

    handleOnsetChange(track, onsets) {

    }

    handleOffsetChange(track, offset) {

    }

    render() {

        let noteValues = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'B#'];

        return (
            <div className="Euclid">
                <div className="ring">
                    <svg id="ring_svg" version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink"
                         x="0px"
                         y="0px"
                         width="558.7px"
                         height="558.7px"
                         viewBox="0 0 558.7 558.7"
                         xmlSpace="preserve">
                        <EuclidRing isRunning={this.props.isRunning} channel="1" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="2" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="3" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="4" step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                    </svg>
                </div>
                <div className="divider">
                    <div className="track">Track</div>
                    <div>Note</div>
                    <div>Onsets</div>
                    <div>Offset</div>

                    <div className="track">1</div>
                    <Stepper items={noteValues} onChange={(val)=>{this.handleNoteChange(0, val)}}/>
                    <Stepper default={0} min={0} max={8} onChange={(val) => {this.handleOnsetChange(0, val)}}/>
                    <Stepper default={0} min={0} max={7} onChange={(val) => {this.handleOffsetChange(0, val)}}/>

                    <div className="track">2</div>
                    <Stepper items={noteValues} onChange={(val)=>{this.handleNoteChange(1, val)}}/>
                    <Stepper default={0} min={0} max={8} onChange={(val) => {this.handleOnsetChange(1, val)}}/>
                    <Stepper default={0} min={0} max={7} onChange={(val) => {this.handleOffsetChange(1, val)}}/>

                    <div className="track">3</div>
                    <Stepper items={noteValues} onChange={(val)=>{this.handleNoteChange(2, val)}}/>
                    <Stepper default={0} min={0} max={8} onChange={(val) => {this.handleOnsetChange(2, val)}}/>
                    <Stepper default={0} min={0} max={7} onChange={(val) => {this.handleOffsetChange(2, val)}}/>

                    <div className="track">4</div>
                    <Stepper items={noteValues} onChange={(val)=>{this.handleNoteChange(3, val)}}/>
                    <Stepper default={0} min={0} max={8} onChange={(val) => {this.handleOnsetChange(3, val)}}/>
                    <Stepper default={0} min={0} max={7} onChange={(val) => {this.handleOffsetChange(3, val)}}/>
                </div>
            </div>
        );
    }
}