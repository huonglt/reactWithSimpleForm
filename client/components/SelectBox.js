import React from 'react';
import styles from '../css/SelectBox.css';

export default class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.setRef = this.setRef.bind(this);
  }
  setRef(dropDown) {
    this.dropDown = dropDown;
  }
  changeHandler() {
    let selectedCountry = this.dropDown.value;

    if(this.props.ignoreFirstItem && this.dropDown.selectedIndex === 0) {
      selectedCountry = null;
    }
    if(this.props.selectCountry) {
      this.props.selectCountry(selectedCountry);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let selectedValue = this.props.selectedValue;
    if(!selectedValue) {
      selectedValue = this.dropDown.options[0].value;
    }
    this.dropDown.value = selectedValue;
  }
  render() {
    const createOption = (item) => <option key={item} value={item}>{item}</option>;
    return (
      <div>
        <select className={styles.selectBox} ref={this.setRef} onChange={this.changeHandler}>{this.props.items.map(createOption)}</select>
      </div>
    );
  }
}
