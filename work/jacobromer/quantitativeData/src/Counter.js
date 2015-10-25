import React, { Component } from 'react';
import CountUp from "./countUp";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this._prevValue = 0;
    this.state = {currentValue: 0, prevValue: 0};
    this.isGood = this.isGood.bind(this);
  }
  componentWillMount() {
    this.setState({currentValue: this.props.value});
  }
  componentWillReceiveProps(nextProps) {
    this._currentValue = nextProps.value;
    this._prevValue = this.state.currentValue;
    this.setState({currentValue: nextProps.value, prevValue: this.state.currentValue});
  }
  componentWillUpdate() {
    this.count(this._prevValue, this._currentValue);
  }
  count(from, to) {
    new CountUp(this._el, from, to, to % 1 === 0 ? 0 : 1, 1.5, {useEasing: true}).start();
  }
  isGood() {
    console.log(this.state.currentValue);
    if(this.state.currentValue <= 0) return "strike";

    if(this.props.whatIsBetter === "lower") {
      return this._currentValue < this.props.threshold ? "good" : "bad";
    } else if (this.props.whatIsBetter === "higher") {
      return this._currentValue > this.props.threshold ? "good" : "bad";
    }
  }
  render() {
    var good = this.isGood();
    return (
      <div>      
        <span 
          ref={(c) => this._el = React.findDOMNode(c)} 
          className={good + " counter"}>
          {this.state.currentValue}
        </span>
        {this.props.addlText ? <span className={good + " counter"}>{this.props.addlText}</span> : <span></span>}
      </div>
    );
  }
}
