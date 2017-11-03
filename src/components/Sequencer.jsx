import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import './style/Synth.css';
import 'jquery-knob';
import Step from './Step';

export default class Sequencer extends Component {

    constructor(props) {
        super(props);

        this.initNoteMatrix = this.initNoteMatrix.bind(this);

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

    getSteps() {
        let steps = [
            [],[],[],[]
        ];
        for(let i = 0; i < this.props.steps; ++i) {
            steps[0].push(<Step key={`0-${i}`} id={`0-${i}`} onNoteSelected={(id, note)=>{this.handleNoteSelected(id, note)}}/>);
            steps[1].push(<Step key={`1-${i}`} id={`1-${i}`} onNoteSelected={(id, note)=>{this.handleNoteSelected(id, note)}}/>);
            steps[2].push(<Step key={`2-${i}`} id={`2-${i}`} onNoteSelected={(id, note)=>{this.handleNoteSelected(id, note)}}/>);
            steps[3].push(<Step key={`3-${i}`} id={`3-${i}`} onNoteSelected={(id, note)=>{this.handleNoteSelected(id, note)}}/>);
        }
        return steps;
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

    lightStep(i) {
        let lastStep = i > 0 ? i - 1 : 15;
        $(`#step-${i}`).attr('checked', true);
        $(`#step-${lastStep}`).removeAttr('checked');
    }

    getStepMarkers() {
        let stepMarkers = [];
        for(let i = 0; i < this.props.steps; ++i) {
            let marker = <td><input className="stepMarker" type="radio" name={`step-${i}`} id={`step-${i}`} disabled="disabled" /></td>;

            stepMarkers.push(marker);
        }
        return stepMarkers;
    }

    render() {
        let steps = this.getSteps();
        let stepMarkers = this.getStepMarkers();

        this.lightStep(this.props.step);

        return (
            <div className="">
                <table className="table Sequencer is-narrow">
                    <tr><td></td>{stepMarkers}</tr>
                    <tr><td className="has-text-black">1</td>{steps[0]}</tr>
                    <tr><td className="has-text-black">2</td>{steps[1]}</tr>
                    <tr><td className="has-text-black">3</td>{steps[2]}</tr>
                    <tr><td className="has-text-black">4</td>{steps[3]}</tr>
                </table>
            </div>
        );
    }
}