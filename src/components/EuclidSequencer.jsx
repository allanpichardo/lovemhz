import React, { Component } from 'react';
import './style/EuclidSequencer.css';
import 'jquery-knob';
import EuclidRing from "./EuclidRing";
import Stepper from "./Stepper";
import Euclid from 'euclidean-rhythms';

export default class Sequencer extends Component {

    constructor(props) {
        super(props);

        this.initNoteMatrix = this.initNoteMatrix.bind(this);
        this.handleStepClicked = this.handleStepClicked.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleOnsetChange = this.handleOnsetChange.bind(this);
        this.handleOffsetChange = this.handleOffsetChange.bind(this);
        this.rotate = this.rotate.bind(this);

        this.onsetSteppers = [null, null, null, null];


        this.state = {
            notes: this.props.initialSequence ? this.props.initialSequence : this.initNoteMatrix(),
            tonesForTrack: ['C', 'C', 'C', 'C'],
            offsets: [0,0,0,0]
        };
    }

    componentDidMount() {
        let savedState = sessionStorage.getItem('EuclidSequencer');
        savedState = JSON.parse(savedState);
        if(savedState) {
            this.setState(savedState);
        }
    }

    componentWillUnmount() {
        let stateJson = JSON.stringify(this.state);
        sessionStorage.setItem('EuclidSequencer', stateJson);
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

    handleStepClicked(e) {
        let data = e.split('-');
        let currentSequence = this.state.notes.slice();
        if(!currentSequence[data[0]][data[1]]) {
            currentSequence[data[0]][data[1]] = this.state.tonesForTrack[data[0]];

            if(this.onsetSteppers[data[0]]) {
                this.onsetSteppers[data[0]].rightClicked(null);
            }
        } else {
            currentSequence[data[0]][data[1]] = null;

            if(this.onsetSteppers[data[0]]) {
                this.onsetSteppers[data[0]].leftClicked(null);
            }
        }

        this.setState({
            notes: currentSequence
        });

        this.props.onNewSequence(currentSequence);
    }

    handleNoteChange(track, note) {
        let tones = this.state.tonesForTrack.slice();
        tones[track] = note;

        let sequence = this.state.notes.slice();
        sequence[track].forEach((oldNote, i) => {
            if(oldNote) {
                sequence[track][i] = note;
            }
        });

        this.setState({
            tonesForTrack: tones,
            notes: sequence
        });

        this.props.onNewSequence(sequence);
    }

    handleOnsetChange(track, onsets) {
        let euclid = Euclid.getPattern(onsets, this.props.steps);
        euclid = this.rotate(euclid, this.state.offsets[track]);

        let currentNotes = this.state.notes.slice();
        let note = this.state.tonesForTrack[track];

        euclid.forEach((step, i) => {
            currentNotes[track][i] = step === 1 ? note : null;
        });

        this.setState({
            notes: currentNotes
        });

        this.props.onNewSequence(currentNotes);
    }

    handleOffsetChange(track, offset) {
        let offsets = this.state.offsets.slice();
        offsets[track] = offset;

        let sequence = this.state.notes.slice();
        sequence[track] = this.rotate(sequence[track], offset);

        this.setState({
            notes: sequence,
            offsets: offsets,
        });

        this.props.onNewSequence(sequence);
    }

    rotate(array, n) {
        let L = array.length;
        return array.slice(L - n).concat(array.slice(0, L - n));
    };

    render() {

        let noteValues = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        let selectedOnsets0 = (this.state.notes[0]) ? this.state.notes[0].filter(Boolean).length : 0;
        let selectedOnsets1 = (this.state.notes[1]) ? this.state.notes[1].filter(Boolean).length : 0;
        let selectedOnsets2 = (this.state.notes[2]) ? this.state.notes[2].filter(Boolean).length : 0;
        let selectedOnsets3 = (this.state.notes[3]) ? this.state.notes[3].filter(Boolean).length : 0;

        let initialNote0 = noteValues[noteValues.indexOf(this.state.tonesForTrack[0])];
        let initialNote1 = noteValues[noteValues.indexOf(this.state.tonesForTrack[1])];
        let initialNote2 = noteValues[noteValues.indexOf(this.state.tonesForTrack[2])];
        let initialNote3 = noteValues[noteValues.indexOf(this.state.tonesForTrack[3])];

        let initialOffset0 = this.state.offsets[0];
        let initialOffset1 = this.state.offsets[1];
        let initialOffset2 = this.state.offsets[2];
        let initialOffset3 = this.state.offsets[3];

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
                        <EuclidRing isRunning={this.props.isRunning} channel="1" onsets={this.state.notes[0]} step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="2" onsets={this.state.notes[1]} step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="3" onsets={this.state.notes[2]} step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                        <EuclidRing isRunning={this.props.isRunning} channel="4" onsets={this.state.notes[3]} step={this.props.step} onStepClicked={(e) => {this.handleStepClicked(e)}}/>
                    </svg>
                </div>
                <div className="divider">
                    <div className="track">Track</div>
                    <div>Note</div>
                    <div>Onsets</div>
                    <div>Offset</div>

                    <div className="track">1</div>
                    <Stepper default={initialNote0} items={noteValues} onChange={(val)=>{this.handleNoteChange(0, val)}}/>
                    <Stepper ref={(stepper) => {this.onsetSteppers[0] = stepper;}} default={selectedOnsets0} min={0} max={8} onChange={(val) => {this.handleOnsetChange(0, val)}}/>
                    <Stepper default={initialOffset0} min={0} max={7} onChange={(val) => {this.handleOffsetChange(0, val)}}/>

                    <div className="track">2</div>
                    <Stepper default={initialNote1} items={noteValues} onChange={(val)=>{this.handleNoteChange(1, val)}}/>
                    <Stepper ref={(stepper) => {this.onsetSteppers[1] = stepper;}} default={selectedOnsets1} min={0} max={8} onChange={(val) => {this.handleOnsetChange(1, val)}}/>
                    <Stepper default={initialOffset1} min={0} max={7} onChange={(val) => {this.handleOffsetChange(1, val)}}/>

                    <div className="track">3</div>
                    <Stepper default={initialNote2} items={noteValues} onChange={(val)=>{this.handleNoteChange(2, val)}}/>
                    <Stepper ref={(stepper) => {this.onsetSteppers[2] = stepper;}} default={selectedOnsets2} min={0} max={8} onChange={(val) => {this.handleOnsetChange(2, val)}}/>
                    <Stepper default={initialOffset2} min={0} max={7} onChange={(val) => {this.handleOffsetChange(2, val)}}/>

                    <div className="track">4</div>
                    <Stepper default={initialNote3} items={noteValues} onChange={(val)=>{this.handleNoteChange(3, val)}}/>
                    <Stepper ref={(stepper) => {this.onsetSteppers[3] = stepper;}} default={selectedOnsets3} min={0} max={8} onChange={(val) => {this.handleOnsetChange(3, val)}}/>
                    <Stepper default={initialOffset3} min={0} max={7} onChange={(val) => {this.handleOffsetChange(3, val)}}/>
                </div>
            </div>
        );
    }
}