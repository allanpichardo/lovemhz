import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/ADSR.css';

export default class ADSR extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
        }
    }

    componentDidMount() {
        $("#attack").knob();
        $("#decay").knob();
        $("#sustain").knob();
        $("#release").knob();
    }

    render() {
        return (
            <div className="ADSR">
                    <div className="attack">
                        <h3 className="panel_title">A</h3>
                        <input type="text" value={0} id="attack" className="knob" data-width="70"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                    </div>
                    <div className="decay">
                        <h3 className="panel_title">D</h3>
                        <input type="text" value={0} id="decay" className="knob" data-width="70"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                    </div>
                    <div className="sustain">
                        <h3 className="panel_title">S</h3>
                        <input type="text" value={75} id="sustain" className="knob" data-width="70"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                    </div>
                    <div className="release">
                        <h3 className="panel_title">R</h3>
                        <input type="text" value={75} id="release" className="knob" data-width="70"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="true" data-angleOffset="180"/>
                    </div>
            </div>
        );
    }
}