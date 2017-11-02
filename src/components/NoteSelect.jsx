import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import 'jquery-knob';

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
                                <input type="radio" name={this.getRadioName()} value="C" onClick={() => {this.props.onNoteSelected('C')}}/>
                                    C
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="C#" onClick={() => {this.props.onNoteSelected('C#')}}/>
                                    C#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="D" onClick={() => {this.props.onNoteSelected('D')}}/>
                                    D
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="D#" onClick={() => {this.props.onNoteSelected('D#')}}/>
                                    D#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="E" onClick={() => {this.props.onNoteSelected('E')}}/>
                                    E
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="F" onClick={() => {this.props.onNoteSelected('F')}}/>
                                    F
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="F#" onClick={() => {this.props.onNoteSelected('F#')}}/>
                                    F#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="G" onClick={() => {this.props.onNoteSelected('G')}}/>
                                    G
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="G#" onClick={() => {this.props.onNoteSelected('G#')}}/>
                                    G#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="A" onClick={() => {this.props.onNoteSelected('A')}}/>
                                    A
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="A#" onClick={() => {this.props.onNoteSelected('A#')}}/>
                                    A#
                            </label>
                            <label className="radio">
                                <input type="radio" name={this.getRadioName()} value="B" onClick={() => {this.props.onNoteSelected('B')}}/>
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