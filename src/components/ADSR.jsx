import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import 'jquery-knob';

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
            <div className="">
                <div className="columns">
                    <div className="field column">
                        <label className="label">Attack</label>
                        <div className="control">
                            <input type="text" value={0} id="attack" className="knob" data-width="25"
                                   data-height="25" data-displayInput="false" data-angleOffset="180"/>
                        </div>
                    </div>
                    <div className="field column">
                        <label className="label">Decay</label>
                        <div className="control">
                            <input type="text" value={0} id="decay" className="knob" data-width="25"
                                   data-height="25" data-displayInput="false" data-angleOffset="180"/>
                        </div>
                    </div>
                    <div className="field column">
                        <label className="label">Sustain</label>
                        <div className="control">
                            <input type="text" value={75} id="sustain" className="knob" data-width="25"
                                   data-height="25" data-displayInput="false" data-angleOffset="180"/>
                        </div>
                    </div>
                    <div className="field column">
                        <label className="label">Release</label>
                        <div className="control">
                            <input type="text" value={75} id="release" className="knob" data-width="25"
                                   data-height="25" data-displayInput="false" data-angleOffset="180"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}