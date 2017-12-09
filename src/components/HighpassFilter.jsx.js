import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/Filter.css';

export default class HighpassFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
        }
    }

    componentDidMount() {
        $(`#freq-hpf-${this.state.id}`).knob();
        $(`#peak-hpf-${this.state.id}`).knob();
    }

    render() {
        return (
            <div className="Filter">
                <div className="ttl"><h3 className="panel_title">{this.state.id}</h3></div>
                <div className="freq">
                    <p>Freq</p>
                    <input type="text" value="0" id={`freq-hpf-${this.state.id}`} className="knob" data-width="70"
                           data-height="70" data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                </div>
                <div className="peak">
                    <p>Peak</p>
                    <input type="text" value="0" id={`peak-hpf-${this.state.id}`} className="knob" data-width="50"
                           data-height="50"  data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                </div>
            </div>
        );
    }
}