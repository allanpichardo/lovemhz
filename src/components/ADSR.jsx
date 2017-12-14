import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';
import './style/ADSR.css';

export default class ADSR extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
            attack: 10,
            decay: 25,
            sustain: 20,
            release: 10,
        };

        this.handleAttackChanged = this.handleAttackChanged.bind(this);
        this.handleDecayChanged = this.handleDecayChanged.bind(this);
        this.handleReleaseChanged = this.handleReleaseChanged.bind(this);
        this.handleSustainChanged = this.handleSustainChanged.bind(this);
        this.saveState = this.saveState.bind(this);
    }

    componentDidMount() {
        $("#attack").knob({
            'change' : (v) => {
                this.handleAttackChanged(v, false)
            },
            'release' : (v) => {
                this.handleAttackChanged(v, true)
            }
        });
        $("#decay").knob({
            'change' : (v) => {
                this.handleDecayChanged(v, false)
            },
            'release' : (v) => {
                this.handleDecayChanged(v, true)
            }
        });
        $("#sustain").knob({
            'change' : (v) => {
                this.handleSustainChanged(v, false)
            },
            'release' : (v) => {
                this.handleSustainChanged(v, true)
            }
        });
        $("#release").knob({
            'change' : (v) => {
                this.handleReleaseChanged(v, false)
            },
            'release' : (v) => {
                this.handleReleaseChanged(v, true)
            }
        });

        let savedState = JSON.parse(sessionStorage.getItem('ADSR'));
        if(savedState) {
            this.setState(savedState);
        }
    }

    componentDidUpdate() {
        $('#attack').trigger('blur');
        $('#decay').trigger('blur');
        $('#sustain').trigger('blur');
        $('#release').trigger('blur');
    }

    componentWillUnmount() {
        this.saveState();
    }

    saveState() {
        let state = JSON.stringify(this.state);
        sessionStorage.setItem('ADSR', state);
    }

    render() {
        return (
            <div className="ADSR">
                    <div className="attack">
                        <h3 className="panel_title">A</h3>
                        <input type="text" value={this.state.attack} id="attack" className="knob" data-width="70" data-max="100"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                    <div className="decay">
                        <h3 className="panel_title">D</h3>
                        <input type="text" value={this.state.decay} id="decay" className="knob" data-width="70" data-max="100"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                    <div className="sustain">
                        <h3 className="panel_title">S</h3>
                        <input type="text" value={this.state.sustain} id="sustain" className="knob" data-width="70" data-max="100"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                    <div className="release">
                        <h3 className="panel_title">R</h3>
                        <input type="text" value={this.state.release} id="release" className="knob" data-width="70" data-max="100"
                               data-height="70"   data-fgColor="#c20097" data-bgColor="#044f4d" data-displayInput="false" data-angleOffset="180"/>
                    </div>
            </div>
        );
    }

    handleAttackChanged(v, shouldSave) {
        this.setState({
            attack: v
        });
        this.props.onAttackChanged(v/100, shouldSave);
    }

    handleDecayChanged(v, shouldSave) {
        this.setState({
            decay: v
        });
        this.props.onDecayChanged(v/100, shouldSave);
    }

    handleSustainChanged(v, shouldSave) {
        this.setState({
            sustain: v
        });
        this.props.onSustainChanged(v/100, shouldSave);
    }

    handleReleaseChanged(v, shouldSave) {
        this.setState({
            release: v
        });
        this.props.onReleaseChanged(v/100, shouldSave);
    }
}