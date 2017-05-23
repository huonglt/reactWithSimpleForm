import React from 'react';
import styles from '../css/App.css';
import AppInfoContainer from '../containers/AppInfoContainer';
import Gatca from './Gatca';
import SelectCountryOfTaxResidenceContainer from '../containers/SelectCountryOfTaxResidenceContainer';
import CountryOfTaxResidenceInfoContainer from '../containers/CountryOfTaxResidenceInfoContainer';
import { COUNTRY_LIST, MIN_COUNTRY_OF_RESIDENCE, MAX_COUNTRY_OF_RESIDENCE } from '../data/constants';
import { TAX_INFO_OF_COUNTRIES } from '../data/mock';

export default class App extends React.Component {
  render() {
    let { container, heading } = styles;

    return (
      <div className={container}>
        <div className={heading}>A simple React + Redux app</div>
        <SelectCountryOfTaxResidenceContainer taxInfoOfCountries={TAX_INFO_OF_COUNTRIES}/>
        <CountryOfTaxResidenceInfoContainer/>
      </div>
    );
  }
}
