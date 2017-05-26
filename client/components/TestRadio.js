import React from 'react';
import styles from '../css/TestRadio.css';

export default class TestRadio extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { checked: this.props.checked };

  }
  handleClick() {
    if(this.props.disabled) {
      return;
    }
    if(this.props.handleClick) {
      this.props.handleClick(this.props.value);
    } else {
      this.setState({ checked: !this.state.checked});
    }
  }

  render() {
    /*
     * if the radio button is managed through the RadioGroup control, its checked property is determined by its props
     * If the radio button is a stand-alone one, its checked property is determined by its own state
    */
    let propertyController = (this.props.handleClick) ? this.props : this.state;
    let disabled = this.props.disabled;
    let radio = styles.oval +  (propertyController.checked ? ' ' + styles.checked : '') + (disabled ? ' ' + styles.disabled : '');
    return (
      <div onClick={this.handleClick}>
        <div className={radio} ></div>
        <div className={styles.label}>{this.props.label}</div>
      </div>
    );
  }
}
