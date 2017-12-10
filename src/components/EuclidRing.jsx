import React, { Component } from 'react';
import './style/EuclidSequencer.css';
import 'jquery-knob';

export default class EuclidRing extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.getRing = this.getRing.bind(this);
    }

    getRing(channel) {
        switch(channel) {
            case '1':
                return(
                    <g>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-1" className="oddRing" d="M319.9,187.9l-19.2,46.2c10.4,4.9,18.8,13.4,23.8,23.8l46.2-19.2C360.7,216.1,342.5,197.9,319.9,187.9z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-2" className="oddRing" d="M372.7,243.4l-46.2,19.2c1.9,5.2,2.9,10.9,2.9,16.8s-1,11.5-2.9,16.8l46.2,19.2c4.3-11.2,6.7-23.3,6.7-36
				                    S377,254.5,372.7,243.4z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-4" className="oddRing" d="M296.1,326.4c-5.2,1.9-10.9,2.9-16.8,2.9c-5.9,0-11.6-1-16.8-2.9l-19.2,46.2c11.2,4.3,23.3,6.7,36,6.7
				                    c12.7,0,24.8-2.4,35.9-6.7L296.1,326.4z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-7" className="oddRing" d="M238.7,187.9c-22.6,10-40.8,28.2-50.8,50.8l46.2,19.2c4.9-10.4,13.4-18.8,23.8-23.8L238.7,187.9z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-6" className="oddRing" d="M186,243.4c-4.3,11.2-6.7,23.3-6.7,36s2.4,24.8,6.7,36l46.2-19.1c-1.9-5.2-2.9-10.9-2.9-16.8
				                    s1-11.6,2.9-16.8L186,243.4z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-5" className="oddRing" d="M234.1,300.8l-46.2,19.2c10,22.6,28.2,40.8,50.8,50.8l19.1-46.2C247.5,319.6,239.1,311.1,234.1,300.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-3" className="oddRing" d="M324.5,300.8c-4.9,10.4-13.4,18.8-23.8,23.8l19.1,46.2c22.6-10,40.8-28.2,50.9-50.8L324.5,300.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="0-0" className="oddRing" d="M279.3,179.3c-12.7,0-24.8,2.4-36,6.7l19.1,46.2c5.2-1.9,10.9-2.9,16.8-2.9c5.9,0,11.5,1,16.8,2.9l19.1-46.2
				                    C304.1,181.7,292,179.3,279.3,179.3z"/>
                    </g>
                );
            case '2':
                return(
                    <g>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-1" className="evenRing" d="M342.3,140.4l-19.2,46.2c21.4,10.1,38.8,27.5,48.9,48.9l46.2-19.2C403,182.7,375.9,155.6,342.3,140.4z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-2" className="evenRing" d="M422.1,225.6l-46.2,19.2c3.9,10.8,6,22.4,6,34.6s-2.1,23.8-6,34.6l46.2,19.2c6.3-16.7,9.7-34.8,9.7-53.7
                                    C431.8,260.4,428.4,242.3,422.1,225.6z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-4" className="evenRing" d="M313.9,375.8c-10.8,3.9-22.4,6-34.6,6c-12.1,0-23.8-2.1-34.6-6l-19.2,46.2c16.7,6.3,34.8,9.8,53.8,9.8
                                    c18.9,0,37-3.4,53.7-9.7L313.9,375.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-7" className="evenRing" d="M216.4,140.4c-33.6,15.3-60.7,42.3-76,76l46.2,19.2c10.1-21.4,27.5-38.7,48.9-48.9L216.4,140.4z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-6" className="evenRing" d="M136.6,225.6c-6.3,16.7-9.7,34.8-9.7,53.7c0,18.9,3.4,37,9.7,53.7l46.2-19.1c-3.9-10.8-6-22.4-6-34.6
                                    s2.1-23.8,6-34.6L136.6,225.6z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-5" className="evenRing" d="M186.6,323.1l-46.2,19.2c15.2,33.6,42.3,60.7,76,76l19.2-46.2C214.1,361.9,196.8,344.5,186.6,323.1z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-3" className="evenRing" d="M372,323.1c-10.1,21.4-27.5,38.8-48.9,48.9l19.2,46.2c33.6-15.2,60.7-42.4,76-76L372,323.1z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="1-0" className="evenRing" d="M279.3,126.8c-18.9,0-37,3.4-53.7,9.7l19.2,46.2c10.8-3.9,22.4-6,34.6-6c12.1,0,23.8,2.1,34.5,6l19.2-46.2
                                    C316.3,130.3,298.2,126.8,279.3,126.8z"/>
                    </g>
                );
            case '3':
                return(
                    <g>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-6" className="oddRing" d="M123.9,279.3c0,18.4,3.2,36,9.1,52.4l-46.6,19.3c-8.3-22.3-12.8-46.5-12.8-71.7c0-25.2,4.5-49.4,12.8-71.7
                                    l46.6,19.3C127.1,243.3,123.9,260.9,123.9,279.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-5" className="oddRing" d="M212.9,419.8l-19.3,46.6c-44.7-20.5-80.9-56.7-101.4-101.4l46.7-19.3C154.2,378.2,180.4,404.5,212.9,419.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-7" className="oddRing" d="M212.9,138.8c-32.5,15.4-58.7,41.6-74.1,74.1l-46.7-19.3c20.5-44.8,56.7-80.9,101.4-101.4L212.9,138.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-0" className="oddRing" d="M351,86.3L331.7,133c-16.4-5.9-34-9.1-52.4-9.1c-18.4,0-36,3.2-52.4,9.1l-19.3-46.6
                                    c22.3-8.3,46.5-12.9,71.7-12.9C304.5,73.5,328.7,78,351,86.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-4" className="oddRing" d="M351.1,472.3c-22.3,8.3-46.5,12.8-71.7,12.8c-25.3,0-49.4-4.5-71.8-12.9l19.3-46.6c16.4,5.9,34.1,9.1,52.5,9.1
                                    c18.4,0,36-3.2,52.4-9.1L351.1,472.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-3" className="oddRing" d="M466.5,365.1C446,409.8,409.8,446,365,466.5l-19.3-46.7c32.5-15.4,58.7-41.6,74.1-74.1L466.5,365.1z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-1" className="oddRing" d="M466.5,193.6l-46.7,19.3c-15.4-32.5-41.7-58.8-74.2-74.1L365,92.1C409.8,112.7,445.9,148.8,466.5,193.6z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="2-2" className="oddRing" d="M485.1,279.3c0,25.2-4.5,49.4-12.9,71.7l-46.6-19.3c5.9-16.4,9.1-34,9.1-52.4c0-18.4-3.2-36-9.1-52.4l46.6-19.3
                                    C480.6,229.9,485.1,254.1,485.1,279.3z"/>
                    </g>
                );
            case '4':
                return (
                    <g>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-6" className="evenRing" d="M70.3,279.3c0,24.7,4.3,48.5,12.2,70.5l-62.7,26c-11.2-30-17.3-62.5-17.3-96.5s6.1-66.4,17.3-96.5l62.7,26
                                    C74.6,230.9,70.3,254.6,70.3,279.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-5" className="evenRing" d="M190,468.3l-26,62.7c-60.2-27.6-108.8-76.2-136.4-136.4l62.8-26C111,412.3,146.3,447.7,190,468.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-7" className="evenRing" d="M190,90.3c-43.7,20.7-79,56-99.7,99.7l-62.8-26C55.2,103.8,103.8,55.2,164,27.6L190,90.3z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-0" className="evenRing" d="M375.7,19.8l-26,62.7c-22-7.9-45.7-12.2-70.4-12.2c-24.7,0-48.5,4.3-70.5,12.2l-26-62.7
                                    c30-11.2,62.5-17.3,96.5-17.3C313.2,2.5,345.7,8.6,375.7,19.8z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-4" className="evenRing" d="M375.8,538.9c-30,11.2-62.5,17.3-96.5,17.3c-34,0-66.5-6.1-96.6-17.3l26-62.7c22.1,7.9,45.8,12.2,70.6,12.2
                                    c24.7,0,48.5-4.3,70.5-12.2L375.8,538.9z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-3" className="evenRing" d="M531.1,394.7c-27.6,60.2-76.2,108.8-136.4,136.4l-26-62.8c43.7-20.6,79-56,99.7-99.7L531.1,394.7z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-1" className="evenRing" d="M531.1,164l-62.8,26c-20.7-43.7-56-79.1-99.7-99.7l26-62.7C454.8,55.2,503.4,103.8,531.1,164z"/>
                        <path onClick={(e) => {this.props.onStepClicked(e.target.id)}} id="3-2" className="evenRing" d="M556.2,279.3c0,33.9-6.1,66.4-17.3,96.5l-62.7-26c7.9-22,12.2-45.7,12.2-70.5c0-24.7-4.3-48.5-12.2-70.5
                                    l62.7-26C550.1,212.9,556.2,245.4,556.2,279.3z"/>
                    </g>
                );
            default:
                return false;
        }
    }

    render() {
        let ring = this.getRing(this.props.channel);
        let theClass = this.props.channel === '1' || this.props.channel === '3' ? 'oddRing' : 'evenRing';

        const childrenWithProps = React.Children.map(ring.props.children,
            (child) => React.cloneElement(child, {
                className: (child.props.id === `${(this.props.channel - 1)}-${this.props.step}`) && this.props.isRunning ? `${theClass} stepOn` : theClass
            })
        );

        return(
            <g>
                {childrenWithProps}
            </g>
        );
    }

    componentDidUpdate() {
        this.props.onsets.forEach((onset, i) => {
            let id = `${(this.props.channel - 1)}-${i}`;
            let step = document.getElementById(id);

            if(onset) {
                step.classList.add('stepActive');
            } else {
                step.classList.remove('stepActive');
            }
        });
    }

}