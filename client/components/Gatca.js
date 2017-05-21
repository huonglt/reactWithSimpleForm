import React from 'react';
import SelectResidency from './SelectResidency';

export default class Gatca extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cnt: this.props.min, selectedCountries: {} };
    this.countries = ['Select country', ...this.props.countryList];

    this.addSelectResidency = this.addSelectResidency.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
  addSelectResidency() {
    if(this.state.cnt + 1 > this.props.max) {
      return;
    }
    this.setState((prevState, props) => ({...prevState, cnt: prevState.cnt + 1}));
  }

  selectCountry(index, countryName) {
    let selectedCountries = this.state.selectedCountries;
    selectedCountries[index] = countryName;
    this.setState((prevState) => ({...prevState, selectedCountries}));
  }

  removeHandler(index) {
    let selectedCountries = this.state.selectedCountries;
    selectedCountries[index] = null;
    let newSelectedCountries = {};
    let j = 1;
    for(let i = 1; i <= this.state.cnt; i++) {
      if(selectedCountries[i] != null) {
          newSelectedCountries[j] = selectedCountries[i];
          j++;
      }
    }
    selectedCountries = newSelectedCountries;
    this.setState((prevState, props) => {
      let cnt = prevState.cnt - 1;
      if(cnt < this.props.min) {
        cnt = this.props.min;
      }
      return {...prevState, cnt, selectedCountries};
    });
  }

  render() {
    let selectResidencies = [];
    for(let i = 1; i <= this.state.cnt; i++) {
      selectResidencies.push(<SelectResidency selectedValue={this.state.selectedCountries[i]} removeHandler={this.removeHandler} key={i} index={i} countries={this.countries} selectCountry={this.selectCountry}/>);
    }
    return (
      <div>
        {selectResidencies}
        <div><input type="button" value="Add" onClick={this.addSelectResidency}/></div>
      </div>
    );
  }
}
