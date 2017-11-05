import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'jquery-knob';
import Calculations from "../utility/Calculations";

export default class NoteSelect extends Component {

    constructor(props) {
        super(props);

        this.getActiveClass = this.getActiveClass.bind(this);
    }

    componentDidMount() {
    }

    getActiveClass() {
        return this.props.isActive ? "is-active" : "";
    }

    getRadioName() {
        return `${this.props.id}-note`;
    }

    render() {
        return (
            <div className={`modal ${this.getActiveClass()}`}>
                <div className="modal-background" onClick={() => {this.props.onCloseClicked()}}/>
                <div className="modal-content">
                    <div className="modal-card-body">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="C" onClick={() => {this.props.onNoteSelected(Calculations.C0)}}/>
                                    C
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="C#" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(1))}}/>
                                    C#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="D" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(2))}}/>
                                    D
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="D#" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(3))}}/>
                                    D#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="E" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(4))}}/>
                                    E
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="F" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(5))}}/>
                                    F
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="F#" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(6))}}/>
                                    F#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="G" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(7))}}/>
                                    G
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="G#" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(8))}}/>
                                    G#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="A" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(9))}}/>
                                    A
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="A#" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(10))}}/>
                                    A#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="B" onClick={() => {this.props.onNoteSelected(Calculations.noteToFrequency(11))}}/>
                                B
                            </label>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" onClick={() => {this.props.onCloseClicked()}} aria-label="close"/>
            </div>
        );
    }
}