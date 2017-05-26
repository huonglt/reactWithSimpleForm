import React from 'react';
import styles from '../css/App.css';
import AppInfoContainer from '../containers/AppInfoContainer';
import Gatca from './Gatca';
import SelectCountryOfTaxResidenceContainer from '../containers/SelectCountryOfTaxResidenceContainer';
import CountryOfTaxResidenceInfoContainer from '../containers/CountryOfTaxResidenceInfoContainer';
import { COUNTRY_LIST, MIN_COUNTRY_OF_RESIDENCE, MAX_COUNTRY_OF_RESIDENCE } from '../data/constants';
import { TAX_INFO_OF_COUNTRIES } from '../data/mock';
import RadioGroup from './RadioGroup';
import TestRadio from './TestRadio';
import TestRadioGroup from './TestRadioGroup';

export default class App extends React.Component {
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
        <TestRadio label="Single One" value="Single" disabled={true} />
      </div>
    );
  }
}
