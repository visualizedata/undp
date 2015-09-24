import React, { Component } from 'react';
import Counter from "./Counter";
var data = require("./data.tsv");
import tsv from "tsv";

export default class App extends Component {
  constructor() {
    super();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this._data = tsv.parse(data.replace(/\./g, "").replace(/,/g, ".")).reduce((p, c) => {
      p[c.countryName] = c;
      return p;
    }, {});
    this._selectOptions = Object.keys(this._data).sort((a,b) => {return a.localeCompare(b);});
    this.state = {currentCountry: this._data[this._selectOptions[1]], selectedValue: this._selectOptions[1]};
  }
  handleSelectChange(e) {
    this.setState({currentCountry: this._data[e.target.value], selectedValue: e.target.value});
    console.log(this._data[e.target.value]);
  }
  render() {
    var country = this.state.currentCountry;
    var schoolDiff = country.expectedSchoolingMale - country.expectedSchoolingFemale;
    schoolDiff = schoolDiff % 1 === 0 ? parseInt(schoolDiff, 10) : schoolDiff.toFixed(1);
    // @todo: this is not super exact
    if(country.earnedIncomeRatio !== "") 
      var earningsDiff = parseInt((1 - parseFloat(country.earnedIncomeRatio)) * 100);
    if(country.percentageWomenInParliament)
      var parliamentPercent = parseInt(country.percentageWomenInParliament);
    console.log(this.state.selectedValue);
    return (
      <span>
        <h1>
          <span>As a <u>woman</u> in </span>
          <label>
            <select id="countryselect" 
              value={this.state.selectValue} 
              defaultValue="Angola"
              onChange={this.handleSelectChange}>
              {this._selectOptions.reduce((p,c,i) => {
                  p.push(<option key={i} value={c}>{c}</option>);
                  return p;
                }, [])}
              </select>
            </label>
            <span>, <br /></span>
            <span>you earn </span>
            <Counter value={earningsDiff ? earningsDiff : 0} theshold={10} whatIsBetter="lower" addlText="%" />
            <span> less than men</span>
            <span>, you go to school for </span>
            <Counter value={schoolDiff} threshold={1} whatIsBetter="lower" />
            <span> years less than men, </span>
            <span>you live an average </span>
          <Counter value={this.state.currentCountry.lifeExpectancyFemale} 
            threshold={60}
            whatIsBetter="higher" /> 
          <span> years, </span>
          <span> and women hold </span>
          <Counter value={parliamentPercent} threshold={40} whatIsBetter="higher" addlText="%" />
          <span> of all seats in parliament.</span>
        </h1>
        <h1 className="underline">Why?</h1>
      </span>
    );
  }
}
