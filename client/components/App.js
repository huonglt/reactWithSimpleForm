import React from 'react';
import styles from '../css/App.css';
import AppInfoContainer from '../containers/AppInfoContainer';
import Gatca from './Gatca';
import { COUNTRY_LIST, MIN_COUNTRY_OF_RESIDENCE, MAX_COUNTRY_OF_RESIDENCE } from '../data/constants';

export default class App extends React.Component {
  render() {
    let { container, heading } = styles;

    return (
      <div className={container}>
        <div className={heading}>A simple React + Redux app</div>
        <Gatca countryList={COUNTRY_LIST} min={MIN_COUNTRY_OF_RESIDENCE} max={MAX_COUNTRY_OF_RESIDENCE}/>
      </div>
    );
  }
}
