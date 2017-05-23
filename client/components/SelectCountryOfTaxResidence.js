import React from 'react';
import styles from '../css/SelectCountryOfTaxResidence.css';
export default class SelectCountryOfTaxResidence extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.tinChangeHandler = this.tinChangeHandler.bind(this);
    this.shouldDisplayTin = this.shouldDisplayTin.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = { countryTaxInfo: null,  tin: ''};
  }
  handleChange(event) {
    if(event.target.selectedIndex == 0) {
      this.setState((prevState) => ({ countryTaxInfo: null,  tin: '' }));
      return;
    }
    let selectedCountryId= event.target.value;
    if(this.state.countryTaxInfo && selectedCountryId == this.state.countryTaxInfo.id) {
      return;
    }
    let countryTaxInfo = this.props.taxInfoOfCountries.find((elem) => elem.id == selectedCountryId);
    if(countryTaxInfo) {
      this.setState((prevState) => ({ ...prevState, countryTaxInfo, tin: '' }));
    }
  }
  tinChangeHandler(event) {
    let tin = event.target.value;
    this.setState((prevState) => ({ ...prevState, tin }));
  }
  shouldDisplayTin() {
    const countryTaxInfo = this.state.countryTaxInfo;
    let displayTin = false;
    let labelTin = null;
    if(countryTaxInfo) {
      displayTin = (countryTaxInfo.tinRequired === true || countryTaxInfo.tinRequired === false);
      labelTin = (countryTaxInfo.tinRequired === false) ? 'Optional' : '';
    }

    return { displayTin, labelTin };
  }
  handleSelect() {
    let countryOfTaxResidence = { id: this.state.countryTaxInfo.id, name: this.state.countryTaxInfo.name, tin: this.state.tin};
    this.props.selectCountryOfTaxResidence(countryOfTaxResidence);
  }
  render() {
    const createOption = (countryTaxInfo) => <option key={countryTaxInfo.id} value={countryTaxInfo.id}>{countryTaxInfo.name}</option>;
    const { displayTin, labelTin } = this.shouldDisplayTin();
    return (
      <div className={styles.container}>
        <div style={{flex: '0 0 100%', marginBottom:'10px'}}>Select country of tax residence</div>
        <div className={styles.countryDropDown}>
          <select style={{width:'130px'}} onChange={this.handleChange}>
            <option>Select a country</option>
            {this.props.taxInfoOfCountries.map(createOption)}
          </select>

        </div>
        {
          displayTin &&
            <div className={styles.tinContainer}>
              <div>Your tax number {labelTin}</div>
              <div className={styles.spaceLeft}><input type="text" value={this.state.tin} onChange={this.tinChangeHandler}/></div>
            </div>
        }
        {
          this.state.countryTaxInfo && <div  style={{flex: '0 0 100%', marginTop:'10px'}}><input onClick={this.handleSelect} type="button" value="Select"/></div>
        }
        
      </div>
    );
  }
}
