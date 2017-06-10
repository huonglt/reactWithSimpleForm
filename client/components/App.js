import React from 'react';
import styles from '../css/App.css';
import AppInfoContainer from '../containers/AppInfoContainer';
import Gatca from './Gatca';
import SelectCountryOfTaxResidenceContainer from '../containers/SelectCountryOfTaxResidenceContainer';
import CountryOfTaxResidenceInfoContainer from '../containers/CountryOfTaxResidenceInfoContainer';
import { COUNTRY_LIST, MIN_COUNTRY_OF_RESIDENCE, MAX_COUNTRY_OF_RESIDENCE } from '../data/constants';
import { TAX_INFO_OF_COUNTRIES, COUNTRIES } from '../data/mock';
import RadioGroup from './RadioGroup';
import TestRadio from './TestRadio';
import TestRadioGroup from './TestRadioGroup';
import AutoComplete from './AutoComplete';
import Dialog from './Dialog';
import sortBy from 'lodash.sortby';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.state = {showDialog: false};
  }
  openDialog() {
    this.setState({showDialog: true});
  }

  render() {
    let { container, heading } = styles;
    const items1 = [{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}];
    const items2 = [{ label: 'True', value: 'True' }, { label: 'False', value: 'False'}];

    return (
      <div className={container}>
        <div className={heading}>A simple React + Redux app</div>
        <section style={{marginBottom: '15px'}}>
          <RadioGroup items={items1} defaultValue="No"/>
        </section>
        <section>
          <RadioGroup items={items2} defaultValue="True" disabled/>
        </section>
        <TestRadioGroup items={items1} value="Yes"/>
        <TestRadio label="Single One" value="Single"/>
        <SelectCountryOfTaxResidenceContainer taxInfoOfCountries={TAX_INFO_OF_COUNTRIES}/>
        <div>
          <div>GATCA Test</div>
          <Gatca min={MIN_COUNTRY_OF_RESIDENCE} max={MAX_COUNTRY_OF_RESIDENCE} countryList={COUNTRY_LIST}/>
        </div>
        <AutoComplete items={COUNTRIES} style={{marginTop:'10px'}}/>
        <Dialog show={this.state.showDialog} title={"My dialog"}>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </div>
        </Dialog>
        <input type="button" value="Open dialog" onClick={this.openDialog}/>
      </div>
    );
  }
}
