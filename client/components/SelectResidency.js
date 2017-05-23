import React from 'react';
import SelectBox from './SelectBox';
import styles from '../css/SelectResidency.css';

export default class SelectResidency extends React.Component {
  constructor(props) {
    super(props);
    this.selectCountry = this.selectCountry.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
  selectCountry() {
    if(this.props.selectCountry) {
      let result = this.props.selectCountry(this.props.index, arguments[0]);
      console.log('result = ' + result);
      if(!result) {
        console.log('already choosen country at ' + this.props.index);
      }
    }
  }
  removeHandler() {
    if(this.props.removeHandler) {
      this.props.removeHandler(this.props.index);
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div>
          <div>Country of Residency</div>
          <SelectBox selectedValue={this.props.selectedValue} ignoreFirstItem={true} items={this.props.countries} selectCountry={this.selectCountry}/>
        </div>
        <div className={styles.middleColumn}>
          <div>Tax number(optional)</div>
          <div><input type="text"/></div>
        </div>
        <div className={styles.lastColumn}>
          <input type="button" value="Remove" onClick={this.removeHandler}/>
        </div>
      </div>
    );
  }
}
