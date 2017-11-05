import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import 'jquery-knob';
import NoteSelect from "./NoteSelect";
import Calculations from "../utility/Calculations";

export default class Step extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNoteSelectActive: false,
            note: Calculations.C0
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.getId = this.getId.bind(this);
    }

    componentDidMount() {

    }

    handleClick() {
        let isChecked = $(`#${this.getId()}`).is(':checked');
        if(isChecked) {
            this.toggleModal(true);
        } else {
            this.handleNoteSelected(null);
        }
    }

    getId() {
        return `step-${this.props.id}`;
    }

    toggleModal(show) {
        let newState = {
            isNoteSelectActive: show,
            note: this.state.note,
        };
        this.setState(newState);
    }

    closeNoteSelect() {
        this.toggleModal(false);
    }

    handleNoteSelected(note) {
        let newState = {
            isNoteSelectActive: this.state.isNoteSelectActive,
            note: note,
        };
        this.setState(newState);

        this.props.onNoteSelected(this.props.id, note);

        this.closeNoteSelect();
    }

    render() {
        return (
            <td>
                <input type="checkbox" id={this.getId()} onClick={() => {this.handleClick()}} />
                <NoteSelect id={`noteselect-${this.getId()}`}
                            isActive={this.state.isNoteSelectActive}
                            onCloseClicked={() => {this.closeNoteSelect()}}
                            onNoteSelected={(note) => {this.handleNoteSelected(note)}}
                />
            </td>
        );
    }
}