import React, {Component} from 'react';

export default class Tab extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let tabs = document.querySelectorAll('.tab');
        tabs.forEach((elem)=>{
            elem.classList.remove('tab_selected');
        });

        let div = e.target.parentElement;
        this.props.onTabSelected(div);
    }

    render() {

        let classes = `tab ${this.props.tabClass}`;
        return (
            <div className={classes}><a href="#" onClick={(e)=>{this.handleClick(e)}}>{this.props.title}</a></div>
        );
    }
}